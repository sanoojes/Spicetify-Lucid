import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary" | "danger";
	size?: "small" | "medium" | "large";
	isLoading?: boolean;
	icon?: React.ReactNode;
	children?: React.ReactNode;
};
