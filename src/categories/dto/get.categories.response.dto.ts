import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";
import { CategoryDTO } from "./category.dto";
import { Type } from "class-transformer";

export class getCategoriesResponseDTO {
  @ApiProperty({ type: () => CategoryDTO, isArray: true })
  @IsArray()
  @Type(() => CategoryDTO)
  categories: CategoryDTO[];
  
   @ApiPropertyOptional({ description: 'Cursor for next page',  })
    @IsOptional()
    @IsString()
    nextCursor?: string;
  
    @ApiProperty({ description: 'Indicates if there are more results', default: false })
    @IsBoolean()
    hasNextPage: boolean;
}