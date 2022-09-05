import { ChangeEvent } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import styles from './input.module.css';

interface InputProps {
  placeholder: string;
  label: Path<any>;
  register: UseFormRegister<any>;
  type?: string;
  required?: boolean;
  isError?: boolean;
  error?: string;
}

const Input = ({
  placeholder,
  required,
  label,
  register,
  isError,
  type,
  error,
}: InputProps) => (
  <>
    <div className={styles.inputContainer}>
      <label
        htmlFor={label}
        className={styles.label}
        style={{
          color: isError ? 'var(--red-color)' : undefined,
          borderColor: isError ? 'var(--red-color)' : undefined
        }}
      >
        {isError ? error : capitalizeFirstLetter(label)}
      </label>
      <input
        className={styles.input}
        placeholder={placeholder}
        type={type}
        {...register(label, { required })}
      />
    </div>
  </>
);

const capitalizeFirstLetter = (str: string) => {
  if (typeof str !== 'string') return '';

  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default Input;