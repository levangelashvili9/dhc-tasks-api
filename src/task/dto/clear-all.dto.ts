import { IsEnum, IsOptional } from 'class-validator';

import { TaskStatus } from '../enums/task-status.enum';

export class ClearAllDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
