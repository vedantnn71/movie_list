import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class AddMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @Type(() => Number)
  @IsNumber()
  releasedAt: string | Date;

  @Type(() => Number)
  @IsNumber()
  rating: number;

  @Type(() => Boolean)
  @IsBoolean()
  watched: boolean;

  @IsString()
  genre: string;

  @IsString()
  trailer: string;
}