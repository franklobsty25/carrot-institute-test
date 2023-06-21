import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class MenuDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;

}

export class UpdateMenuDTO {
    @IsOptional()
    name?: string;

    @IsOptional()
    category?: string;

    @IsOptional()
    price?: number;

    @IsOptional()
    description?: string;

    @IsOptional()
    imageUrl?: string;
}