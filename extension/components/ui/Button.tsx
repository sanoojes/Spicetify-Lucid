import type { ButtonProps } from '@app/types/uiSchema.ts';

const Button: React.FC<ButtonProps> = ({
  buttonText,
  children,
  onClick,
  className = '',
  variant = 'default',
}) => {
  return (
    <button type="button" onClick={onClick} className={`lucid-button ${variant} ${className}`}>
      {buttonText}
      {children}
    </button>
  );
};

export default Button;
