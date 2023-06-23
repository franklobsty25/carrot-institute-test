import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    password: string;
}

export class FileUploadDTO {
    @ApiProperty({type: 'string', format: 'binary'})
    file: any
}