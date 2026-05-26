import type { ReactNode } from "react";

type TreeRowIconButtonProps = {
  active: boolean;
  title: string;
  onClick: (e: React.MouseEvent) => void;
  children: ReactNode;
  dangerOnHover?: boolean;
};

export function TreeRowIconButton({
  active,
  title,
  onClick,
  children,
  dangerOnHover = false,
}: TreeRowIconButtonProps) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex h-5 w-5 items-center justify-center rounded ${
        active
          ? "hover:bg-white/15"
          : dangerOnHover
            ? "hover:bg-slate-100 hover:text-rose-600"
            : "hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}
