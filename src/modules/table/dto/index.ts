import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsNotEmpty } from "class-validator";

export class CreateTableDTO {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    chairs: number;

}

export class UpdateTableDTO extends PartialType(CreateTableDTO) {}

export class FilterTableDTO {
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