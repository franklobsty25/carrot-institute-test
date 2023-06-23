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
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  otherName?: string;

  @ApiProperty({type: 'email'})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  confirmPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @ApiProperty()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @IsOptional()
  lastName?: string;

  // @ApiProperty()
  // @IsOptional()
  // otherName?: string;

  @ApiProperty()
  @IsOptional()
  email?: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsStrongPassword()
  // password?: string;

  @ApiProperty()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  address?: string;
}

export class FilterUserDTO {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search?: string;
}

export class RoleDTO {
  @ApiProperty({enum: ['Buyer', 'Seller', 'Admin']})
  @IsEnum(RoleEnum)
  role: RoleEnum;
}
