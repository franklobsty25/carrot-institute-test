import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMenuDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    category?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    ingredients?: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    imageUrl?: string;

}

export class UpdateMenuDTO{
    @ApiProperty()
    @IsOptional()
    name?: string;

    @ApiProperty()
    @IsOptional()
    category?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    ingredients?: string;

    @ApiProperty()
    @IsOptional()
    price?: number;

    @ApiProperty()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsOptional()
    imageUrl?: string;
}

export class FilterMenuDTO {
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