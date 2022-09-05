import { ChangeEvent } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import styles from './input.module.css';

interface InputProps {
  placeholder: string;
  label: Path<any>;
  register: UseFormRegister<any>;
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
        {isError ? error : label}
      </label>
      <input
        className={styles.input}
        placeholder={placeholder}
        {...register(label, { required })}
      />
    </div>
  </>
);

export default Input;