import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { StorageService } from '../storage/storage.service';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import { AddMovieDto, UpdateMovieDto } from './dto';

interface IAddMovie {
  userId: string;
  movie: AddMovieDto;
  thumbnail: Express.Multer.File;
}

interface IUpdateMovie {
  userId: string;
  movie: UpdateMovieDto;
  thumbnail?: Express.Multer.File;
  id: number;
}

interface IGetMovie {
  userId: string;
  id: number;
}

@Injectable()
export class MoviesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly storage: StorageService,
  ) { }

  async getMovies(userId: string) {
    const movies = await this.prisma.movie.findMany({ where: { userId } });
    return movies;
  }

  async getMovie({ userId, id }: IGetMovie) {
    try {
      const movie = await this.prisma.movie.findUnique({
        where: { id: +id },
      });

      if (movie.userId !== userId) {
        throw new ForbiddenException('Movie not found');
      }

      return movie;
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException('Movie not found');
      }
    }
  }

  async addMovie({
    userId,
    movie,
    thumbnail,
  }: IAddMovie) {
    const thumbnailUrl = await this.storage.uploadThumbnail(thumbnail);

    const newMovie = await this.prisma.movie.create({
      data: {
        ...movie,
        thumbnail: thumbnailUrl,
        releasedAt: new Date(movie.releasedAt),
        userId,
      },
    });

    delete newMovie.userId;
    return newMovie;
  }

  async updateMovie({
    userId,
    movie,
    thumbnail,
    id,
  }: IUpdateMovie) {
    const toUpdate: UpdateMovieDto = {};

    if (movie.title) {
      toUpdate['title'] = movie.title;
    }

    if (movie.description) {
      toUpdate['description'] = movie.description;
    }

    if (movie.releasedAt) {
      toUpdate['releasedAt'] = new Date(+movie.releasedAt);
    }

    if (thumbnail || typeof thumbnail !== 'undefined') {
      toUpdate['thumbnail'] = await this.storage.uploadThumbnail(thumbnail);
    }

    if (movie.genre) {
      toUpdate['genre'] = movie.genre;
    }

    if (movie.rating) {
      toUpdate['rating'] = movie.rating;
    }

    if (movie.trailer) {
      toUpdate['trailer'] = movie.trailer;
    }

    if (typeof movie.watched !== 'undefined') {
      toUpdate['watched'] = movie.watched;
    }

    const updatedMovie = await this.prisma.movie.update({
      where: { id: +id },
      data: toUpdate,
    });

    delete updatedMovie.userId;
    return updatedMovie;
  }

  async deleteMovie({ userId, id }: IGetMovie) {
    try {
      const movie = await this.prisma.movie.findUnique({
        where: { id: +id },
      });

      if (movie.userId !== userId) {
        throw new ForbiddenException('Movie not found');
      }

      await this.prisma.movie.delete({ where: { id: +id } });
      return true;
    }
    catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new ForbiddenException('Movie not found');
      }
    }
  }
}
