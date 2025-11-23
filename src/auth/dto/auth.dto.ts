/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(10)
  password!: string;
}
