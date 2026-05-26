import type { ReactNode } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type HTMLMotionProps,
  type Transition,
} from "motion/react";

const builderEase = [0.2, 0.8, 0.2, 1] as const;

const builderMotionTransition = {
  duration: 1.2,
  ease: builderEase,
} satisfies Transition;

export function BuilderMotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={builderMotionTransition}>
      {children}
    </MotionConfig>
  );
}

export function BuilderAnimatePresence({ children }: { children: ReactNode }) {
  return <AnimatePresence>{children}</AnimatePresence>;
}

export function AnimatedCanvasSection({ transition, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 56, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        layout: { duration: 1.25, ease: builderEase },
        opacity: { duration: 1.05, ease: builderEase },
        scale: { duration: 1.15, ease: builderEase },
        y: { duration: 1.25, ease: builderEase },
        ...transition,
      }}
      {...props}
    />
  );
}

export function AnimatedFade({ transition, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.05, ease: builderEase, ...transition }}
      {...props}
    />
  );
}

export function AnimatedLeftPanel({ transition, ...props }: HTMLMotionProps<"aside">) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -64 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.25, ease: builderEase, ...transition }}
      {...props}
    />
  );
}

export function AnimatedRightPanel({ transition, ...props }: HTMLMotionProps<"aside">) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 64 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.25, ease: builderEase, ...transition }}
      {...props}
    />
  );
}

export function AnimatedBottomSheet({ transition, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial={{ y: 120 }}
      animate={{ y: 0 }}
      exit={{ y: 120 }}
      transition={{ duration: 1.35, ease: builderEase, ...transition }}
      {...props}
    />
  );
}

export function AnimatedRightSidebarItem({ transition, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 28, y: 8 },
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ duration: 0.85, ease: builderEase, ...transition }}
      {...props}
    />
  );
}

export function AnimatedStaggerList({ transition, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.18, delayChildren: 0.18, ...transition }}
      {...props}
    />
  );
}

export function AnimatedSidebarItem({ transition, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: -28, y: 8 },
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ duration: 0.85, ease: builderEase, ...transition }}
      {...props}
    />
  );
}
