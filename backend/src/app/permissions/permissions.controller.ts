import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './permission.entity';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }

  @Post()
  create(@Body() permission: Permission) {
    return this.permissionsService.create(permission);
  }

  @Put(':name')
  update(@Param('name') name: string, @Body() updatedPermission: Permission) {
    return this.permissionsService.updateByName(name, updatedPermission);
  }

  @Delete(':name')
  async delete(@Param('name') name: string) {
    try {
      await this.permissionsService.deleteByName(name);
      return { message: 'Xoá quyền thành công' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: 'Không tìm thấy quyền để xoá' };
      }
      throw error;
    }
  }
}
