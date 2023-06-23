import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FilterOrderDTO {
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
