import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './permission.schema';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  findAll(): Promise<Permission[]> {
    return this.permissionsService.findAll();
  }

  @Get(':name')
  findOneByName(@Param('name') name: string): Promise<Permission | null> {
    return this.permissionsService.findOneByName(name);
  }

  @Post()
  create(@Body() permission: Permission): Promise<Permission> {
    return this.permissionsService.create(permission);
  }

  @Put(':name')
  @HttpCode(HttpStatus.OK)
  async updateByName(
    @Param('name') name: string,
    @Body() permission: Permission,
  ): Promise<{ success: boolean; data: Permission | null }> {
    try {
      const result = await this.permissionsService.updateByName(
        name,
        permission,
      );
      return { success: true, data: result.data };
    } catch (error) {
      return { success: false, data: null };
    }
  }

  @Delete(':name')
  @HttpCode(HttpStatus.OK)
  async deleteByName(
    @Param('name') name: string,
  ): Promise<{ success: boolean; data: Permission | null }> {
    try {
      const result = await this.permissionsService.deleteByName(name);
      return { success: true, data: result.data };
    } catch (error) {
      return { success: false, data: null };
    }
  }
}
