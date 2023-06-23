import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterCartDTO {
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

export class PaymentDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
