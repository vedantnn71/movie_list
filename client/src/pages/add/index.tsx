import { Button, Input, Nav } from "@/components"
import { SubmitHandler, useForm } from "react-hook-form";
import { Fields } from "./types";
import { useAddMovieMutation } from "@/store/services";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import styles from './add.module.css';
import { AddMovie } from "@/store/services/types";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required('Name is required'),
  releasedAt: yup.date().required('Released at is required'),
  genre: yup.string().required('Genre is required'),
  trailer: yup.string().required('Trailer is required'),
  thumbnail: yup.mixed().required('Thumbnail is required'),
});

const Add = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Fields>({
    resolver: yupResolver(schema),
  });
  const [addMovie, { isError, isLoading, error }] = useAddMovieMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Fields> = async (data) => {
    const payload = new FormData();

    payload.append('title', data.title);
    payload.append('releasedAt', (+data.releasedAt).toString());
    payload.append('genre', data.genre);
    payload.append('trailer', data.trailer);
    payload.append('thumbnail', data.thumbnail[0]);

    await addMovie(payload);

    if (!isLoading && !error) {
      navigate('/');
    }
  }

  return (
    <div className={styles.container}>
      <Nav />

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='file'
          label='thumbnail'
          placeholder="Upload a file"
          register={register}
          isError={!!errors.thumbnail}
          error={errors.thumbnail?.message}
        />

        <Input
          label='title'
          placeholder='Title of the movie'
          register={register}
          isError={!!errors.title}
          error={errors.title?.message}
        />

        <Input
          type='date'
          label='releasedAt'
          placeholder='Released at'
          register={register}
          isError={!!errors.releasedAt}
          error={errors.releasedAt?.message}
        />

        <Input
          label='genre'
          placeholder='Genre'
          register={register}
          isError={!!errors.genre}
          error={errors.genre?.message}
        />

        <Input
          label='trailer'
          placeholder='Trailer'
          register={register}
          isError={!!errors.trailer}
          error={errors.trailer?.message}
        />

        <Button
          type='submit'
          disabled={!!errors.thumbnail || !!errors.title || !!errors.releasedAt || !!errors.genre}
          isLoading={isLoading}
        >
          Add
        </Button>

        {isError && <p className={styles.error}>Something went wrong</p>}
      </form>
    </div>
  );
};

export default Add;
