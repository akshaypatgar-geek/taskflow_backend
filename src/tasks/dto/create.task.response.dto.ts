// create-task-response.dto.ts

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsUUID, IsString, IsEnum, IsOptional } from "class-validator";
import { taskPriorityEnum } from "src/db/schema";

export class TaskMutationResponseDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  @IsUUID()
  authorId: string;

  @ApiPropertyOptional({
    enum: taskPriorityEnum.enumValues,
    enumName: "TaskPriority",
  })
  @IsEnum(taskPriorityEnum.enumValues)
  priority: (typeof taskPriorityEnum.enumValues)[number];

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  categoryId: string | null;
}