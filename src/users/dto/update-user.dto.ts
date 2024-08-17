import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsPositive()
  age: number;

  @IsOptional()
  @IsStrongPassword()
  password: string;
}
