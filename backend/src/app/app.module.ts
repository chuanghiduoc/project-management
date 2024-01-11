import { Module } from '@nestjs/common';
import { PermissionsModule } from './permissions/permissions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/project-management'),
    PermissionsModule,
    RolesModule,
  ],
})
export class AppModule {}
