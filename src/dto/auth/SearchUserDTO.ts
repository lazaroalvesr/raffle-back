import { IsOptional, IsString } from "class-validator";

export class SearchUserDTO {

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    email?: string

    @IsOptional()
    @IsString()
    telephone?: string
}