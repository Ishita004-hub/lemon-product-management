import type { ButtonHTMLAttributes } from "react";
import { cx } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: Props) {
  const variants = {
    primary: "bg-[#168fd5] text-white hover:bg-[#117fbd]",
    secondary: "bg-[#edf2f5] text-[#1682c3] hover:bg-[#e3eaee]",
    ghost: "bg-transparent text-[#168fd5] hover:bg-[#edf8ff]",
    danger: "bg-white text-[#ef4b4b] hover:bg-red-50",
  };

  const sizes = {
    sm: "h-8 px-4 text-[12px]",
    md: "h-10 px-5 text-[13px]",
  };

  return (
    <button
      className={cx(
        "inline-flex items-center justify-center rounded-[7px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
