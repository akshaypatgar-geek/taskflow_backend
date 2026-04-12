import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class GetCategoriesDTO {
      @ApiPropertyOptional()
      @IsOptional()
      limit?: number;
    
      @ApiPropertyOptional()
      @IsOptional()
      cursor?: string;
}