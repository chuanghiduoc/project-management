import { Controller, Get, Param } from '@nestjs/common';
import { RoleService } from './roles.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }
}
