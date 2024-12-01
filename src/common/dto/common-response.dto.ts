import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommonResponseDto {
  @ApiProperty({ description: 'id of task', example: 5 })
  @IsString()
  id: number;

  @ApiProperty({
    description: 'create time of task',
    example: '2024-11-30T17:06:28.936Z',
  })
  @IsString()
  createdAt: string;

  @ApiProperty({
    description: 'last update time of task',
    example: '2024-11-30T17:06:28.936Z',
  })
  @IsString()
  updatedAt: string;
}
