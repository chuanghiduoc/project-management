import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from './auth/auth.module';
// import { UserModule } from './users/user.module';
// import { ProjectsModule } from './projects/';
import databaseConfig from '../config/database.config';
// import { appConfig } from './config/app.config';
// import { RolesModule } from './roles/role.module';
import { PermissionsModule } from './permissions/permission.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    // AuthModule,
    // UserModule,
    // RolesModule,
    PermissionsModule,
    // ProjectsModule,
  ],
})
export class AppModule {}
