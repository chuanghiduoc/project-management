import { Controller, Get, Param } from '@nestjs/common';
import { PermissionService } from './permissions.service';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(id);
  }
}
