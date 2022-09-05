import { ReactNode, useEffect, useState } from 'react';
import styles from './button.module.css';

interface ButtonProps {
  color?: 'primary' | 'white' | string;
  borderRadius?: 'rounded' | 'square' | string;
  size?: 'small' | 'medium' | 'large';
  height?: string;
  width?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
}

const Button = ({
  color = 'primary',
  borderRadius = 'square',
  size = 'medium',
  height,
  width,
  disabled = false,
  isLoading = false,
  onClick,
  type,
  children
}: ButtonProps) => {
  const [padding, setPadding] = useState('0.75rem 1.25rem');
  const [radius, setRadius] = useState('12px');

  useEffect(() => {
    if (size === 'small') {
      setPadding('0.25rem 0.5rem');
    }

    if (size === 'large') {
      setPadding('1.25rem 1.75rem');
    }

    if (borderRadius === 'rounded') {
      setRadius('999px');
    }
  }, []);

  return (
    <button
      className={styles.button}
      onClick={() => onClick && onClick()}
      disabled={disabled || isLoading}
      style={{ color, height, width, padding, borderRadius: radius }}
      type={type}
    >
      <span className={styles.label}>{isLoading ? "Loading..." : children}</span>
    </button>
  );
}

export default Button;