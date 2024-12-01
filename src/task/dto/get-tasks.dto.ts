import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { TaskStatus } from '../enums/task-status.enum';
import { CommonResponseDto } from 'src/common/dto/common-response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetTasksDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

export class GetTaskResponseDto extends CommonResponseDto {
  @ApiProperty({ description: 'title of task', example: 'Eat' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'description of task',
    example: 'I should eat because my body needs it',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'status of task',
    example: false,
  })
  @IsString()
  isCompleted: boolean;
}
