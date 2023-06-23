import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRestaurantDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  companyEmail?: string;

  @ApiProperty()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsOptional()
  staffs?: number;
}

export class UpdateRestaurantDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  companyEmail?: string;

  @ApiProperty()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  staffs?: number;
}

export class FilterRestaurantDTO {
  @ApiProperty()
  @IsOptional()
  page?: number;

  @ApiProperty()
  @IsOptional()
  limit?: number;

  @ApiProperty()
  @IsOptional()
  search?: string;
}
