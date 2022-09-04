import { IsBoolean,  IsNumber, IsOptional, IsString } from "class-validator";
import { Transform, Type } from "class-transformer";
import { ToBoolean } from "../decorator";

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

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  rating?: number;

  @ToBoolean()
  @IsOptional()
  watched?: boolean;

  @IsString()
  @IsOptional()
  genre?: string;

  @IsString()
  @IsOptional()
  trailer?: string;
}