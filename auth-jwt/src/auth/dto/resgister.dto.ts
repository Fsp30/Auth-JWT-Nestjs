import { IsEmail, IsNotEmpty,MinLength } from "class-validator";

export class ResgisterDto{
        @IsEmail()
        email: string

        @MinLength(8)
        password: string

        @IsNotEmpty()
        name: string
}