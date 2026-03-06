import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class DeleteTaskResponseDTO {
    @ApiProperty()
    @IsUUID()
    id: string
}