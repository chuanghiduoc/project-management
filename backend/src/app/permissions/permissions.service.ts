import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './permission.schema';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel('Permission')
    private readonly permissionModel: Model<Permission>,
  ) {}

  async findAll(): Promise<Permission[]> {
    return this.permissionModel.find().exec();
  }

  async findOneByName(name: string): Promise<Permission | null> {
    return this.permissionModel.findOne({ name }).exec();
  }

  async create(permission: Permission): Promise<Permission> {
    const existingPermission = await this.permissionModel
      .findOne({ name: permission.name })
      .exec();
    if (existingPermission) {
      throw new ConflictException(
        `Permission with name '${permission.name}' already exists.`,
      );
    }

    const createdPermission = new this.permissionModel(permission);
    return createdPermission.save();
  }

  async updateByName(
    name: string,
    permission: Permission,
  ): Promise<{ success: boolean; data: Permission | null }> {
    const existingPermission = await this.permissionModel
      .findOne({ name })
      .exec();
    if (!existingPermission) {
      throw new NotFoundException(`Permission with name '${name}' not found.`);
    }

    permission.updatedAt = new Date();
    const updatedPermission = await this.permissionModel
      .findOneAndUpdate({ name }, permission, { new: true })
      .exec();
    return { success: true, data: updatedPermission };
  }

  async deleteByName(
    name: string,
  ): Promise<{ success: boolean; data: Permission | null }> {
    const deletedPermission = await this.permissionModel
      .findOneAndDelete({ name })
      .exec();
    if (!deletedPermission) {
      throw new NotFoundException(`Permission with name '${name}' not found.`);
    }

    return { success: true, data: deletedPermission };
  }
}
