import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreateTableDTO {
  @ApiProperty({ example: 'Executive class' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 2 })
  @IsOptional()
  @IsNumber()
  chairs: number;
}

export class UpdateTableDTO extends PartialType(CreateTableDTO) {}

export class FilterTableDTO {
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
