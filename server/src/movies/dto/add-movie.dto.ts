import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class AddMovieDto {
  @IsString()
  title: string;
  
  @Type(() => Number)
  @IsNumber()
  releasedAt: string | Date;

  @IsString()
  genre: string;

  @IsString()
  trailer: string;
}