import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './role.schema';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string): Promise<Role | null> {
    return this.rolesService.findOne(name);
  }

  @Post()
  createRoleWithPermissions(
    @Body() roleData: { name: string; permissions: string[] },
  ): Promise<Role> {
    return this.rolesService.createRoleWithPermissions(roleData);
  }

  @Post(':roleName/permissions/:permissionName')
  addPermissionToRole(
    @Param('roleName') roleName: string,
    @Param('permissionName') permissionName: string,
  ): Promise<Role | null> {
    return this.rolesService.addPermissionToRole(roleName, permissionName);
  }

  @Delete(':roleName/permissions/:permissionName')
  removePermissionFromRole(
    @Param('roleName') roleName: string,
    @Param('permissionName') permissionName: string,
  ): Promise<Role | null> {
    return this.rolesService.removePermissionFromRole(roleName, permissionName);
  }

  @Delete(':name')
  delete(@Param('name') name: string): Promise<Role | null> {
    return this.rolesService.delete(name);
  }
}
