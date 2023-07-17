/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, IsISO8601 } from 'class-validator'

export class SaveMailDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  telefone: string;

  @IsNotEmpty()
  @IsISO8601()
  entrega: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  tamanho: string;

  status: string;
}
