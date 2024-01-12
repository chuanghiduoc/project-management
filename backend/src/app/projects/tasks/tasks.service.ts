import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(taskId: string): Promise<Task | null> {
    return this.taskModel.findById(taskId).exec();
  }

  async create(task: Task): Promise<Task> {
    const createdTask = new this.taskModel(task);
    return createdTask.save();
  }

  async update(taskId: string, updatedTask: Task): Promise<Task | null> {
    const existingTask = await this.taskModel.findById(taskId).exec();

    if (!existingTask) {
      throw new NotFoundException('Task not found.');
    }

    // Update properties
    existingTask.title = updatedTask.title;
    existingTask.description = updatedTask.description;
    existingTask.assignedTo = updatedTask.assignedTo;
    existingTask.status = updatedTask.status;
    existingTask.deadline = updatedTask.deadline;
    existingTask.updatedAt = new Date();

    return existingTask.save();
  }

  async delete(taskId: string): Promise<Task | null> {
    return this.taskModel.findByIdAndDelete(taskId).exec();
  }
}
