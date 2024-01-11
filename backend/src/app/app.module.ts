import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
// import { ProjectsModule } from './projects/';
import databaseConfig from '../config/database.config';
// import { appConfig } from './config/app.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UserModule,
    // ProjectsModule,
  ],
})
export class AppModule {}
