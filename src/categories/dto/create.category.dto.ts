import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsString, MaxLength } from "class-validator";

export class createCategoryDTO {
    @ApiProperty()
    @IsString()
    @MaxLength(20, {message: "Name cannot be more than 20 characters"})
    title: string
}