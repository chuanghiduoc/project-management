import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RoleRepository } from './role.repository';
import { Role } from './role.entity';
import { Permission } from '../permissions/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([Permission]),
  ],
  controllers: [RolesController],
  providers: [RolesService, RoleRepository],
  exports: [RolesService],
})
export class RolesModule {}
