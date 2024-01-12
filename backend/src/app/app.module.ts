import { Module } from '@nestjs/common';
import { PermissionsModule } from './permissions/permissions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './projects/tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/project-management'),
    PermissionsModule,
    RolesModule,
    UsersModule,
    TasksModule,
    ProjectsModule,
  ],
})
export class AppModule {}
