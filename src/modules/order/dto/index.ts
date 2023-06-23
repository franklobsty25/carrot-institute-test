import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty({ required: false, example: 2 })
  @IsOptional()
  @IsNumber()
  quantity?: number;
}
export class FilterOrderDTO {
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
