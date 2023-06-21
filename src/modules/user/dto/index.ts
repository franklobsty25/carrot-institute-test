import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    otherName?: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;

    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @IsOptional()
    @IsString()
    address?: string;
}

export class UpdateUserDTO {
    @IsOptional()
    firstName?: string;

    @IsOptional()
    lastName?: string;

    @IsOptional()
    otherName?: string;

    @IsOptional()
    email?: string;

    @IsOptional()
    @IsStrongPassword()
    password?: string;

    @IsOptional()
    phoneNumber?: string;

    @IsOptional()
    address?: string;
}
