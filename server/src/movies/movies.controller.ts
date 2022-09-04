import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { AddMovieDto, UpdateMovieDto } from './dto';
import { MoviesService } from './movies.service';

@UseGuards(JwtGuard)
@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) { }

  @Get()
  async getMovies(@GetUser('id') userId: string) {
    return this.movieService.getMovies(userId);
  }

  @Get(':id')
  async getMovie(@GetUser('id') userId: string, @Param('id') movieId: number) {
    return this.movieService.getMovie({ userId, id: movieId });
  }

  @Post('add')
  @UseInterceptors(FileInterceptor('thumbnail'))
  async addMovie(
    @GetUser('id') userId: string,
    @Body() movie: AddMovieDto,
    @UploadedFile() thumbnail: Express.Multer.File,
  ) {
    if (!thumbnail) {
      throw new BadRequestException('Thumbnail is required');
    }

    return this.movieService.addMovie({ userId, movie, thumbnail });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('thumbnail'))
  async updateMovie(
    @GetUser('id') userId: string,
    @Body() movie: UpdateMovieDto,
    @UploadedFile() thumbnail: Express.Multer.File,
    @Param('id') movieId: number,
  ) {
    if (!movieId) {
      throw new BadRequestException('Movie id is required');
    }

    if (typeof movie === 'undefined' || JSON.stringify(movie) === '{}') {
      throw new BadRequestException('Movie data is required');
    }

    return this.movieService.updateMovie({ userId, movie, thumbnail, id: movieId });
  }

  @Delete(':id')
  async deleteMovie(@GetUser('id') userId: string, @Param('id') movieId: number) {
    return this.movieService.deleteMovie({ userId, id: movieId });
  }
}
