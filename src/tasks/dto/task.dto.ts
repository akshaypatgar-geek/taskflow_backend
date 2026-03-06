import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEnum, IsUUID, IsOptional } from "class-validator";
import { taskPriorityEnum } from "src/db/schema";

export class TaskDTO {
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

  @ApiProperty({
    enum: taskPriorityEnum.enumValues,
    enumName: "TaskPriority",
  })
  @IsEnum(taskPriorityEnum.enumValues)
  priority: (typeof taskPriorityEnum.enumValues)[number];

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsUUID()
  categoryId: string | null;
}