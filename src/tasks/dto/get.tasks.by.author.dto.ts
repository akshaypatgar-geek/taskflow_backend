import {  ApiProperty, ApiPropertyOptional } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { SortByEnum, SortOrderEnum, taskPriorityEnum, taskStatusEnum } from "src/db/schema";


export class GetTasksByAuthorDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number) 
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  cursor?: string;

  @ApiPropertyOptional({
    enum: taskPriorityEnum.enumValues,
    enumName: "TaskPriority",
  }
  )
  @IsOptional()
  @IsEnum(taskPriorityEnum.enumValues)
    priority: (typeof taskPriorityEnum.enumValues)[number]

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  searchKey?: string;

  @ApiPropertyOptional({  enum: taskStatusEnum, description: 'Filter by task status' })
  @IsOptional()
  @IsEnum(taskStatusEnum.enumValues, {message:"Status should be among OPEN | IN_PROGRESS | COMPLETED"})
  status?: (typeof taskStatusEnum.enumValues)[number]

  @ApiProperty({ required: false, type: String, description: 'Filter tasks created after this date' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ required: false, type: String, description: 'Filter tasks created before this date' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  // --- Sorting ---
  @ApiProperty({ required: false, enum: SortByEnum, description: 'Field to sort by' })
  @IsOptional()
  @IsEnum(SortByEnum)
  sortBy?: SortByEnum;

  @ApiProperty({ required: false, enum: SortOrderEnum, description: 'Sort order: ASC or DESC' })
  @IsOptional()
  @IsEnum(SortOrderEnum)
  sortOrder?: SortOrderEnum;
}
