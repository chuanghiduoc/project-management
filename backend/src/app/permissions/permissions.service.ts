import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async findOneByName(name: string): Promise<Permission | undefined> {
    return this.permissionRepository.findOne({ where: { name } });
  }

  async create(permission: Permission): Promise<Permission> {
    const existingPermission = await this.findOneByName(permission.name);

    if (existingPermission) {
      throw new ConflictException('Quyền đã tồn tại');
    }

    const createdPermission = this.permissionRepository.create(permission);
    return this.permissionRepository.save(createdPermission);
  }

  async updateByName(
    name: string,
    updatedPermission: Permission,
  ): Promise<Permission> {
    const existingPermission = await this.findOneByName(name);

    if (!existingPermission) {
      throw new NotFoundException('Quyền không tồn tại');
    }

    const updatedPermissionWithoutCreatedAt = { ...updatedPermission };
    delete updatedPermissionWithoutCreatedAt.createdAt;

    Object.assign(existingPermission, updatedPermissionWithoutCreatedAt);

    return this.permissionRepository.save(existingPermission);
  }

  async deleteByName(name: string): Promise<void> {
    const existingPermission = await this.findOneByName(name);

    if (!existingPermission) {
      throw new NotFoundException('Quyền không tồn tại');
    }

    await this.permissionRepository.remove(existingPermission);
  }
}
