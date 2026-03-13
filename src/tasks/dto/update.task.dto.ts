import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { taskPriorityEnum, taskStatusEnum } from "src/db/schema";

export class updateTaskDTO{
    @ApiProperty({description:"Task id"})
    @IsUUID()
    id: string;

    @ApiPropertyOptional()
    @IsOptional()
      @IsString()
      @MaxLength(50, { message: "Title can't be more than 50 characters" })
      title: string;

    @ApiPropertyOptional({description:"Task Status"})
    @IsOptional()
    @IsEnum(taskStatusEnum.enumValues, {message:"Status can only be OPEN | IN_PROGRESS | COMPLETED"})
    status: (typeof taskStatusEnum.enumValues)[number]

    @ApiPropertyOptional()
      @IsOptional()
      @IsEnum(taskPriorityEnum.enumValues, { message: "Priority must be LOW, MEDIUM, or HIGH" })
      priority?: (typeof taskPriorityEnum.enumValues)[number] ;
    
      @ApiPropertyOptional()
      @IsOptional()
      @IsUUID()
      categoryId?: string;
}