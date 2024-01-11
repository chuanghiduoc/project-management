import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './role.schema';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel('Role') private readonly roleModel: Model<Role>,
    private readonly permissionsService: PermissionsService,
  ) {}

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().populate('permissions').exec();
  }

  async findOne(name: string): Promise<Role | null> {
    return this.roleModel.findOne({ name }).populate('permissions').exec();
  }

  async addPermissionToRole(
    roleName: string,
    permissionName: string,
  ): Promise<Role | null> {
    const role = await this.roleModel.findOne({ name: roleName }).exec();
    const permission =
      await this.permissionsService.findOneByName(permissionName);

    if (!role || !permission) {
      throw new NotFoundException('Role or permission not found.');
    }

    if (!role.permissions.includes(permission._id)) {
      role.permissions.push(permission._id);
      role.updatedAt = new Date();
      return role.save();
    } else {
      return role;
    }
  }

  async removePermissionFromRole(
    roleName: string,
    permissionName: string,
  ): Promise<Role | null> {
    const role = await this.roleModel.findOne({ name: roleName }).exec();

    if (!role) {
      throw new NotFoundException('Role not found.');
    }

    const permission =
      await this.permissionsService.findOneByName(permissionName);

    if (!permission) {
      throw new NotFoundException('Permission not found.');
    }

    role.permissions = role.permissions.filter(
      (p) => p.toString() !== permission._id.toString(),
    );
    role.updatedAt = new Date();
    return role.save();
  }

  async delete(name: string): Promise<Role | null> {
    return this.roleModel.findOneAndDelete({ name }).exec();
  }

  async createRoleWithPermissions(roleData: {
    name: string;
    permissions: string[];
  }): Promise<Role> {
    const { name, permissions } = roleData;

    // Check if the role already exists
    const existingRole = await this.roleModel.findOne({ name }).exec();
    if (existingRole) {
      throw new ConflictException(`Role with name '${name}' already exists.`);
    }

    // Convert permission names to ObjectId
    const permissionObjects = await Promise.all(
      permissions.map(async (permissionName) => {
        const permission =
          await this.permissionsService.findOneByName(permissionName);
        if (!permission) {
          throw new NotFoundException(
            `Permission with name '${permissionName}' not found.`,
          );
        }
        return permission._id;
      }),
    );

    // Create and save the new role
    const createdRole = new this.roleModel({
      name,
      permissions: permissionObjects,
    });

    return createdRole.save();
  }
}
