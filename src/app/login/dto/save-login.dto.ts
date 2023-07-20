/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail  } from 'class-validator'

export class saveLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  pass: string;
}