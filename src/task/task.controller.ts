import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskResponseDto, GetTasksDto } from './dto/get-tasks.dto';
import { ClearAllDto } from './dto/clear-all.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { TaskStatus } from './enums/task-status.enum';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'used to create a new task' })
  @ApiCreatedResponse({ type: GetTaskResponseDto })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @ApiOperation({ summary: 'used to get all tasks' })
  @ApiQuery({
    name: 'search',
    example: 'eat',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    example: 10,
  })
  @ApiQuery({
    name: 'status',
    example: 'pending',
    required: false,
    enum: TaskStatus,
  })
  @ApiOkResponse({ type: [GetTaskResponseDto] })
  @Get()
  findAll(@Query() getTasksDto: GetTasksDto) {
    return this.taskService.findAll(getTasksDto);
  }

  @ApiOperation({ summary: 'used to edit a task' })
  @ApiOkResponse({ type: GetTaskResponseDto })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @ApiOperation({ summary: 'used to delete a single task' })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.taskService.delete(+id);
  }

  @ApiOperation({ summary: 'used to clear task list' })
  @ApiQuery({
    name: 'status',
    example: 'pending',
    required: false,
    enum: TaskStatus,
  })
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async clearAll(@Query() clearAllDto: ClearAllDto) {
    await this.taskService.clearAll(clearAllDto);
  }

  @ApiOperation({ summary: 'used to mark task as completed' })
  @ApiOkResponse({ type: GetTaskResponseDto })
  @Patch(':id/complete')
  async markAsCompleted(@Param('id') id: string) {
    return this.taskService.markAsCompleted(+id);
  }
}
