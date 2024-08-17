import { IsEmail, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsPositive()
    age: number;

    @IsNotEmpty()
    password: string;
}
