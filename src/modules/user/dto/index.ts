import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { RoleEnum } from 'src/common/constants/schemas';

export class CreateUserDTO {
  @ApiProperty({ example: 'Frank' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Kodie' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ required: false, example: 'Opoku' })
  @IsOptional()
  @IsString()
  otherName?: string;

  @ApiProperty({ example: 'frankkodie@yahoo.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Frank@25.' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'Frank@25.' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  confirmPassword: string;

  @ApiProperty({ example: '0247202968' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: '37 military' })
  @IsNotEmpty()
  @IsString()
  address: string;
}

export class UpdateUserDTO {
  @ApiProperty({ required: false, example: 'Adu' })
  @IsOptional()
  firstName?: string;

  @ApiProperty({ required: false, example: 'Donkor' })
  @IsOptional()
  lastName?: string;

  @ApiProperty({ required: false, example: 'Kofi' })
  @IsOptional()
  otherName?: string;

  @ApiProperty({ required: false, example: 'franklobsty25@gmail.com' })
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false, example: 'People90@' })
  @IsOptional()
  password?: string;

  @ApiProperty({ required: false, example: '0504465048' })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ required: false, example: 'Cantonmant residential' })
  @IsOptional()
  address?: string;
}

export class FilterUserDTO {
  @ApiProperty({ required: false, description: 'Optional' })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({ required: false, description: 'Optional' })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({ required: false, description: 'Optional' })
  @IsOptional()
  @IsString()
  search?: string;
}

export class RoleDTO {
  @ApiProperty({ enum: ['buyer', 'seller', 'admin'] })
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
