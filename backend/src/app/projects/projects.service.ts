import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectRepository } from './project.repository';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }
}
