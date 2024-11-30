import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { ClearAllDto } from './dto/clear-all.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() getTasksDto: GetTasksDto) {
    return this.taskService.findAll(getTasksDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return this.taskService.delete(+id);
  }

  @Delete()
  @HttpCode(204)
  async clearAll(@Query() clearAllDto: ClearAllDto) {
    await this.taskService.clearAll(clearAllDto);
  }

  @Patch(':id/complete')
  async markAsCompleted(@Param('id') id: string) {
    return this.taskService.markAsCompleted(+id);
  }
}
