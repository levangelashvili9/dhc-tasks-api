import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiPropertyOptional({ description: 'title of task', example: 'Eat' })
  @IsOptional()
  @IsNotEmpty({ message: 'Title cannot be an empty string' })
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'description of task',
    example: 'I should eat because my muscles need it',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'Description cannot be an empty string' })
  @IsString()
  description?: string;
}
