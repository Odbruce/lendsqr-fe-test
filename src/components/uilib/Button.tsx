import React from "react";
import Link from "next/link";
import styles from "../../styles/uilib/Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "primaryOutline" | "dangerOutline" | "link" | "text";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  href?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  href,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const buttonClass = `${styles.btn} ${styles[variant]} ${styles[size]} ${
    fullWidth ? styles.wFull : ""
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
}
