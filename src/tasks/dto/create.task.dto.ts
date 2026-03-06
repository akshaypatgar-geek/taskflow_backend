
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsEnum, IsOptional, IsString, MaxLength, IsUUID } from 'class-validator';
import { taskPriorityEnum } from 'src/db/schema';

// Use literal union for Drizzle enum
// export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50, { message: "Title can't be more than 50 characters" })
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(taskPriorityEnum.enumValues, { message: "Priority must be LOW, MEDIUM, or HIGH" })
  priority?: (typeof taskPriorityEnum.enumValues)[number] ;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}