import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @ApiProperty({
   
  })
  @IsUUID()
  id: string;

  @ApiPropertyOptional({
    
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
  })
  @IsOptional()
  @IsString()
  profilePicture: string;

  @ApiProperty({
  })
  @IsString()
  @IsOptional()
  status: string;
}