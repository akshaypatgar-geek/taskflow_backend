import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";
import { TaskDTO } from "./task.dto";
import { Type } from "class-transformer";

export class GetTasksByAuthorResponseDTO {
  @ApiProperty({ type: () => TaskDTO, isArray: true })
  @IsArray()
  @Type(() => TaskDTO)
  tasks: TaskDTO[];

  @ApiProperty({ description: 'Cursor for next page', required: false })
  @IsOptional()
  @IsString()
  nextCursor?: string;

  @ApiProperty({ description: 'Indicates if there are more results', default: false })
  @IsBoolean()
  hasNextPage: boolean;
  
}