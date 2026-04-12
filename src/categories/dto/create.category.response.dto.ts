import { IsEnum, IsString, Length } from "class-validator";
import { categoryEnum } from "../../db/schema";
import { ApiProperty } from "@nestjs/swagger";

export class createCategoryResponseDTO {
  @ApiProperty()
  @IsString()
  @Length(1, 50)
  title: string;

  @ApiProperty()
  @IsEnum(categoryEnum.enumValues)
  status?: (typeof categoryEnum.enumValues)[number]
}