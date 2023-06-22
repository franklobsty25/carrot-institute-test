import { PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRestaurantDTO {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsOptional()
  @IsEmail()
  companyEmail?: string;

  @IsOptional()
  address?: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  staffs?: number;
}

export class UpdateRestaurantDTO {
  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsEmail()
  companyEmail?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  staffs?: number;
}

export class FilterRestaurantDTO {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  search?: string;
}
