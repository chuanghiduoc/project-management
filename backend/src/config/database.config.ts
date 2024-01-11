import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const databaseConfig: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'project-management',
  entities: [
    join(__dirname, 'app/roles/**/*.entity{.ts,.js}'),
    join(__dirname, 'app/permissions/**/*.entity{.ts,.js}'),
    join(__dirname, 'app/auth/**/*.entity{.ts,.js}'),
    join(__dirname, 'app/users/**/*.entity{.ts,.js}'),
    join(__dirname, 'app/projects/**/*.entity{.ts,.js}'),
  ],
  synchronize: true,
  retryAttempts: 10,
};

export default databaseConfig;
