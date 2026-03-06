import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEnum } from "class-validator";
import { categoryEnum } from "src/db/schema";

export class CategoryDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({
    enum: categoryEnum.enumValues,
    enumName: "CategoryStatus",
  })
  @IsEnum(categoryEnum.enumValues)
  status: (typeof categoryEnum.enumValues)[number];
}