import type { ButtonProps } from "@/types/button";
import React, { type FC } from "react";

const Button: FC<ButtonProps> = ({ variant = "primary", size = "medium", icon, children, ...rest }) => {
	return (
		<button className={`button button-${variant} button-${size}`} {...rest}>
			{icon && <span className="button-icon">{icon}</span>}
			{children}
		</button>
	);
};

export default Button;
