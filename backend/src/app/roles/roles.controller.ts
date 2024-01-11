import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './role.entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.rolesService.findById(id);
  }

  @Post()
  create(@Body() role: Role) {
    return this.rolesService.create(role);
  }
}
