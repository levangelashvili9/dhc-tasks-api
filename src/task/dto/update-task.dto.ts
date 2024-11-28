import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Title cannot be an empty string' })
  @IsString()
  title?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Description cannot be an empty string' })
  @IsString()
  description?: string;
}
