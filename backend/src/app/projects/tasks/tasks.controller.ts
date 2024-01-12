import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') taskId: string): Promise<Task | null> {
    return this.tasksService.findOne(taskId);
  }

  @Post()
  create(@Body() task: Task): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Put(':id')
  update(
    @Param('id') taskId: string,
    @Body() updatedTask: Task,
  ): Promise<Task | null> {
    return this.tasksService.update(taskId, updatedTask);
  }

  @Delete(':id')
  delete(@Param('id') taskId: string): Promise<Task | null> {
    return this.tasksService.delete(taskId);
  }
}
