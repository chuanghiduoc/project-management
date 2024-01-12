import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './project.schema';
import { TasksService } from './tasks/tasks.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel('Project') private readonly projectModel: Model<Project>,
    private readonly tasksService: TasksService,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectModel.find().exec();
  }

  async findOne(projectId: string): Promise<Project | null> {
    return this.projectModel.findById(projectId).populate('tasks').exec();
  }

  async create(project: Project): Promise<Project> {
    const createdProject = new this.projectModel(project);
    return createdProject.save();
  }

  async update(
    projectId: string,
    updatedProject: Project,
  ): Promise<Project | null> {
    const existingProject = await this.projectModel.findById(projectId).exec();

    if (!existingProject) {
      throw new NotFoundException('Project not found.');
    }

    existingProject.name = updatedProject.name;
    existingProject.description = updatedProject.description;
    existingProject.updatedAt = new Date();

    return existingProject.save();
  }

  async delete(projectId: string): Promise<Project | null> {
    return this.projectModel.findByIdAndDelete(projectId).exec();
  }

  async assignTaskToProject(
    projectId: string,
    taskId: string,
  ): Promise<Project | null> {
    const project = await this.projectModel.findById(projectId).exec();

    if (!project) {
      throw new NotFoundException('Project not found.');
    }

    const task = await this.tasksService.findOne(taskId);

    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    project.tasks.push(task._id);
    project.updatedAt = new Date();
    return project.save();
  }
}
