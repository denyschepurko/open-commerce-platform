import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "secondary" | "success";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  href?: string;
}

const VARIANTS = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  danger: "bg-red-600 text-white hover:bg-red-700",
  secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  success: "bg-green-600 text-white hover:bg-green-700",
};

const SIZES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  href,
}: ButtonProps) {
  const className = `font-semibold rounded-lg transition-colors cursor-pointer inline-block ${VARIANTS[variant]} ${SIZES[size]} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
}
