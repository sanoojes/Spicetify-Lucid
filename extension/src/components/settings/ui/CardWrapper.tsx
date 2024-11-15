import React, { type HTMLAttributes, type FC, type ReactNode } from "react";

type CardWrapperProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

const CardWrapper: FC<CardWrapperProps> = (props) => {
  const { children, className, ...restProps } = props;

  return (
    <div {...restProps} className={`cards-wrapper ${className || ""}`}>
      {children}
    </div>
  );
};

export default CardWrapper;
