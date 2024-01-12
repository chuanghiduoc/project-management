import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.schema';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') projectId: string): Promise<Project | null> {
    return this.projectsService.findOne(projectId);
  }

  @Post()
  create(@Body() project: Project): Promise<Project> {
    return this.projectsService.create(project);
  }

  @Put(':id')
  update(
    @Param('id') projectId: string,
    @Body() updatedProject: Project,
  ): Promise<Project | null> {
    return this.projectsService.update(projectId, updatedProject);
  }

  @Delete(':id')
  delete(@Param('id') projectId: string): Promise<Project | null> {
    return this.projectsService.delete(projectId);
  }

  @Post(':projectId/tasks/:taskId')
  addTaskToProject(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ): Promise<Project | null> {
    return this.projectsService.addTaskToProject(projectId, taskId);
  }

  @Delete(':projectId/tasks/:taskId')
  removeTaskFromProject(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ): Promise<Project | null> {
    return this.projectsService.removeTaskFromProject(projectId, taskId);
  }

  @Put(':projectId/update-tasks/:taskId')
  updateProjectTasks(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ): Promise<Project | null> {
    return this.projectsService.updateProjectTasks(projectId, taskId);
  }
}
