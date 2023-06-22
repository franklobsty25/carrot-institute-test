import { PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsNotEmpty } from "class-validator";

export class CreateTableDTO {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsNumber()
    chairs: number;

}

export class UpdateTableDTO extends PartialType(CreateTableDTO) {}

export class FilterTableDTO {
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