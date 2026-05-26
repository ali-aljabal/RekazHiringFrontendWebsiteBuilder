# ─────────────────────────────────────────────────────────────
# Stage 1 — Install dependencies
# ─────────────────────────────────────────────────────────────
FROM node:20-slim AS deps

WORKDIR /app

# Copy only package files first (better layer caching)
COPY package.json package-lock.json* ./

# Use install (not ci) so platform-specific optional deps (lightningcss) resolve
RUN npm install --include=optional

# ─────────────────────────────────────────────────────────────
# Stage 2 — Build the Next.js app
# ─────────────────────────────────────────────────────────────
FROM node:20-slim AS builder

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ─────────────────────────────────────────────────────────────
# Stage 3 — Minimal production runtime
# ─────────────────────────────────────────────────────────────
FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=6000
ENV HOSTNAME="0.0.0.0"

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser  --system --uid 1001 nextjs

# Static assets
COPY --from=builder /app/public ./public

# Standalone server output (requires output: 'standalone' in next.config.js)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static     ./.next/static

USER nextjs

EXPOSE 6000

CMD ["node", "server.js"]
