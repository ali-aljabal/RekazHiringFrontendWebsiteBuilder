import { cn } from "@/features/builder/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

// Extend standard button props so you don't have to manually define onClick, onMouseEnter, disabled, etc.
interface CollapsibleHeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  children?: React.ReactNode; // Allows you to pass any text or elements inside
  iconClassName?: string; // Lets you change the chevron color/size per instance
}

export function CollapsibleHeader({
  isOpen,
  children,
  className,
  iconClassName,
  ...props
}: CollapsibleHeaderProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between text-left",
        className, // Allows you to pass specific padding, colors, or fonts per instance
      )}
      {...props}
    >
      {/* Left side: The content */}
      <span className="flex-1 truncate">{children}</span>

      {/* Right side: The Chevron */}
      <span className="ml-2 shrink-0">
        {isOpen ? (
          <ChevronUp className={cn("h-4 w-4 text-slate-400 transition-transform", iconClassName)} />
        ) : (
          <ChevronDown
            className={cn("h-4 w-4 text-slate-400 transition-transform", iconClassName)}
          />
        )}
      </span>
    </button>
  );
}
