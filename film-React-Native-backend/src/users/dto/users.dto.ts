import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// users dto pour donnez des conditions au utilisateur
export class CreateUsersDto {
  @IsNotEmpty()
  @MinLength(3)
  firstname: string;

  @IsNotEmpty()
  @MinLength(3)
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}

export class UpdateUsersDto {
  @IsNotEmpty()
  @MinLength(3)
  firstname: string;

  @IsNotEmpty()
  @MinLength(3)
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
