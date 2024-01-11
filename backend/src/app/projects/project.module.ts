import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './projects.controller';
import { ProjectService } from './projects.service';
import { ProjectRepository } from './project.repository';
import { Project } from './project.entity';
import { TaskModule } from './tasks/task.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), TaskModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectRepository],
  exports: [ProjectService],
})
export class ProjectModule {}
