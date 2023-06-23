import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginDTO {
  @ApiProperty({ example: 'frankkodie@yahoo.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Frank@25.' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;
}

export class FileUploadDTO {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
