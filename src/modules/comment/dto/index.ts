import { PartialType } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDTO {
    @IsOptional()
    @IsString()
    comment: string;

    @IsOptional()
    @IsNumber()
    rate: number;
}

export class UpdateCommentDTO extends PartialType(CreateCommentDTO) {}

export class FilterCommentDTO {
    @IsOptional()
    page?: number;

    @IsOptional()
    limit?: number;

    @IsOptional()
    search?: string;
}