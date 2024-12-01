import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'title of task', example: 'Eat' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'description of task',
    example: 'I should eat because my body needs it',
  })
  @IsString()
  description: string;
}
