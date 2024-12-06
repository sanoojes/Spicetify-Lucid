import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary" | "danger";
	size?: "small" | "medium" | "large";
	isLoading?: boolean;
	icon?: ReactNode;
	children?: ReactNode;
};
