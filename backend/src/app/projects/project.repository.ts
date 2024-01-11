import { EntityRepository, Repository } from 'typeorm';
import { Project } from './project.entity';

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  // Custom repository methods, if needed
}
