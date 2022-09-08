import { IsNumber, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  releasedAt?: Date;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsString()
  @IsOptional()
  trailer?: string;
}