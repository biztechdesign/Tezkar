import { forwardRef } from "react";
import { Link } from "react-router";

type Variant = "primary" | "secondary";

interface BaseProps {
  variant?: Variant;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined };

type LinkProps = BaseProps & {
  to: string;
  type?: never;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type Props = ButtonProps | LinkProps;

const sizeStyles: Record<NonNullable<BaseProps["size"]>, string> = {
  sm: "px-4 py-2.5 text-[11px]",
  md: "px-6 py-3 text-[13px]",
  lg: "px-8 py-4 text-[14px]",
};

function getClasses({ variant, fullWidth, size }: BaseProps) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 uppercase tracking-wider overflow-hidden transition-all duration-300 whitespace-nowrap";
  const width = fullWidth ? "w-full" : "";
  const sz = sizeStyles[size ?? "md"];
  const variantCls =
    variant === "secondary"
      ? "border border-[#044c5c] text-[#044c5c] hover:!text-white"
      : "text-white hover:!text-white";
  return [base, sz, width, variantCls].filter(Boolean).join(" ");
}

const primaryStyle: React.CSSProperties = {
  fontWeight: 600,
  color: "#ffffff",
  background: "#044c5c",
  borderRadius: 0,
  boxShadow: "0 6px 24px rgba(4,76,92,0.25)",
  transition: "box-shadow 0.6s ease",
};

const secondaryStyle: React.CSSProperties = {
  fontWeight: 600,
  color: "#044c5c",
  borderRadius: 0,
  transition: "box-shadow 0.6s ease",
};

function baseStyle(variant: Variant) {
  return variant === "primary" ? primaryStyle : secondaryStyle;
}

const handleEnter = (variant: Variant) => (e: React.MouseEvent<HTMLElement>) => {
  (e.currentTarget as HTMLElement).style.boxShadow =
    "0 6px 24px rgba(200,149,108,0.3)";
  void variant;
};

const handleLeave = (variant: Variant) => (e: React.MouseEvent<HTMLElement>) => {
  (e.currentTarget as HTMLElement).style.boxShadow =
    variant === "primary" ? "0 6px 24px rgba(4,76,92,0.25)" : "none";
};

function Fill() {
  return (
    <span
      className="absolute inset-0 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ backgroundColor: "#d41c5c" }}
      aria-hidden="true"
    />
  );
}

export const CtaButton = forwardRef<HTMLElement, Props>(function CtaButton(
  props,
  ref
) {
  const {
    variant = "primary",
    fullWidth,
    leftIcon,
    rightIcon,
    children,
    size = "md",
    className,
    ...rest
  } = props as BaseProps & Record<string, unknown>;

  const classes = [getClasses({ variant, fullWidth, size }), className]
    .filter(Boolean)
    .join(" ");

  const textColor = variant === "primary" ? "#ffffff" : "#044c5c";
  const inner = (
    <>
      <Fill />
      {leftIcon && (
        <span className="relative z-10 flex items-center group-hover:!text-white transition-colors" style={{ color: textColor }}>
          {leftIcon}
        </span>
      )}
      <span
        className="relative z-10 transition-colors duration-300 group-hover:!text-white"
        style={{ color: textColor }}
      >
        {children}
      </span>
      {rightIcon && (
        <span className="relative z-10 flex items-center group-hover:!text-white transition-colors" style={{ color: textColor }}>
          {rightIcon}
        </span>
      )}
    </>
  );

  if ("to" in props && props.to) {
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        to={props.to}
        onClick={props.onClick}
        className={classes}
        style={baseStyle(variant)}
        onMouseEnter={handleEnter(variant)}
        onMouseLeave={handleLeave(variant)}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      style={baseStyle(variant)}
      onMouseEnter={handleEnter(variant)}
      onMouseLeave={handleLeave(variant)}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {inner}
    </button>
  );
});
