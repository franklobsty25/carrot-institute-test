import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMenuDTO {
  @ApiProperty({ example: 'Dessert Menu' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: false, example: 'Standard' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    required: false,
    example: 'sweet',
  })
  @IsOptional()
  @IsString()
  ingredients?: string;

  @ApiProperty({ example: 250 })
  @IsNumber()
  price: number;

  @ApiProperty({
    required: false,
    example:
      "Many standard menus have dessert sections but because servers collect menus after the entrées are ordered, guests can't refer to these sections later. That's why some restaurants offer separate dessert menus, which may be displayed right on the tables or handed out after all guests are finished eating. Upscale restaurants may even roll out a dessert cart that features each item on the menu, which makes it harder to resist sweet treats even if everyone's full",
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    required: false,
    example:
      'https://upload.wikimedia.org/wikipedia/commons/a/a0/Geraldine_Ulmar_in_Gilbert_and_Sullivan%27s_The_Mikado.jpg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}

export class UpdateMenuDTO {
  @ApiProperty({ required: false, example: 'Beverage Menu' })
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false, example: 'Beverage' })
  @IsOptional()
  category?: string;

  @ApiProperty({
    required: false,
    example: 'beer, wine, cocktail, or even juice and soda options,',
  })
  @IsOptional()
  @IsString()
  ingredients?: string;

  @ApiProperty({ required: false, example: 350 })
  @IsOptional()
  price?: number;

  @ApiProperty({
    required: false,
    example:
      'If you offer multiple beer, wine, cocktail, or even juice and soda options, you may want to separate them onto a distinct beverage menu. Guests who start with water may order drinks later if they have a beverage menu to peruse as they eat. Some beverage menus feature pictures of specialty cocktails, extensive lists of craft beer selections, or information about the ingredients and traditions that inspired each beverage.',
  })
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: false,
    example:
      'https://upload.wikimedia.org/wikipedia/commons/3/37/Generic_Camera_Icon.svg',
  })
  @IsOptional()
  imageUrl?: string;
}

export class FilterMenuDTO {
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
