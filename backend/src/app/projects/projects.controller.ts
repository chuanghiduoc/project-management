import { Controller, Get } from '@nestjs/common';
import { ProjectService } from './projects.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  findAll() {
    return this.projectService.findAll();
  }
}
