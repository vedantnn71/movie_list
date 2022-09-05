import { Button, Logo } from "@/components";
import { Fields } from "./types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components";
import { yupResolver } from '@hookform/resolvers/yup';
import { useLoginMutation } from "@/store/services";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./login.module.css";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string()
    .email('Invalid email.')
    .required('No email provided.'),

  password: yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
}).required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({
    resolver: yupResolver(schema)
  });
  const [signup, { isLoading, isError, error }] = useLoginMutation();
  const [formError, setFormError] = useState<string | null>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    const response = await signup(data).unwrap();
    localStorage.setItem('token', response.access_token);

    if (typeof response.access_token === 'string') {
      navigate('/');
    }
  }

  useEffect(() => {
    if (isError) {
      const queryError = error as FetchBaseQueryError;
      const errorData = queryError.data as { message: string };

      setFormError(errorData?.message || 'Something went wrong');
    }
  }, [isError]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
      </div>

      <div className={styles.header}>
        <h1>Hey! Welcome back</h1>
        <a className={styles.label}>
          <Link to='/signup'>Don't have an account?</Link>
        </a>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="email"
          placeholder="tim@apple.com"
          register={register}
          isError={!!errors.email}
          error={errors.email?.message}
          required
        />

        <Input
          label="password"
          placeholder="********"
          register={register}
          error={errors.password?.message}
          isError={!!errors.password}
          type="password"
          required
        />

        <Button
          type="submit"
          color="primary"
          size="medium"
          width="100% !important"
          disabled={!!errors.email || !!errors.password || isLoading}
          isLoading={isLoading}
        >
          Login
        </Button>
        
        {formError && (
          <label
            className={styles.label}
            style={{ color: formError ? 'var(--red-color)' : '' }}
          >
            {formError}
          </label>
        )}
      </form>
    </div>
  );
};

export default Login;
