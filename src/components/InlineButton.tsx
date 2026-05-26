import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/features/builder/lib/utils";

type TextButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
  active?: boolean;
};

export const TextButton = forwardRef<HTMLButtonElement, TextButtonProps>(function TextButton(
  { icon, active = false, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex h-7 items-center gap-1.5 rounded-md px-1.5 text-xs font-medium tracking-tight transition-colors duration-150 ease-out",
        active ? "bg-blue-50 text-blue-700" : "text-blue-600 hover:bg-blue-50/60",
        className,
      )}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
});
