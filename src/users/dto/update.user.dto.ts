import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(28)
  name?: string;

  @ApiPropertyOptional()
   @IsOptional()
  @IsString()
  profilePicture?: string;
}