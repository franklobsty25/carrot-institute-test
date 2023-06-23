import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRestaurantDTO {
  @ApiProperty({ example: 'Carrot Institute' })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({ example: 'hr@carrotinstitute.com' })
  @IsOptional()
  @IsEmail()
  companyEmail: string;

  @ApiProperty({ required: false, example: 'Junction, Akweteyman, Accra' })
  @IsOptional()
  address?: string;

  @ApiProperty({ example: '0541952025' })
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @ApiProperty({ required: false, example: 100 })
  @IsOptional()
  staffs?: number;
}

export class UpdateRestaurantDTO {
  @ApiProperty({ required: false, example: 'Carrot Institute | Accra' })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiProperty({ required: false, example: 'ceo@carrotinstitute.com' })
  @IsOptional()
  @IsEmail()
  companyEmail?: string;

  @ApiProperty({ required: false, example: 'Akweteyman, Accra' })
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false, example: '0541952520' })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ required: false, example: 50 })
  @IsOptional()
  staffs?: number;
}

export class FilterRestaurantDTO {
  @ApiProperty({ required: false, description: 'Optional' })
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false, description: 'Optional' })
  @IsOptional()
  limit?: number;

  @ApiProperty({ required: false, description: 'Optional' })
  @IsOptional()
  search?: string;
}
