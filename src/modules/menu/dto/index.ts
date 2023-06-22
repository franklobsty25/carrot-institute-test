import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMenuDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    ingredients?: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;

}

export class UpdateMenuDTO{
    @IsOptional()
    name?: string;

    @IsOptional()
    category?: string;

    @IsOptional()
    @IsString()
    ingredients?: string;

    @IsOptional()
    price?: number;

    @IsOptional()
    description?: string;

    @IsOptional()
    imageUrl?: string;
}

export class FilterMenuDTO {
    @IsOptional()
    @IsNumber()
    page?: number;

    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsString()
    search?: string;
}