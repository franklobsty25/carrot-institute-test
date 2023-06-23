import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CheckoutDTO {
  @ApiProperty({ example: '649578f843317759a6add00e' })
  @IsNotEmpty()
  @IsMongoId()
  cart: string;
}

export class CreateCartDTO {
  @ApiProperty({ required: false, example: 5 })
  @IsOptional()
  @IsNumber()
  quantity: number;
}
export class UpdateCartDTO extends PartialType(CreateCartDTO) {}
export class FilterCartDTO {
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

export class PaymentDTO {
  @ApiProperty({ example: 'frankkodie@yahoo.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 250 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
