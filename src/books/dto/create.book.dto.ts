import { IsString, IsInt, Min, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title!: string;

  @IsString()
  author!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  available_copies?: number;
}
