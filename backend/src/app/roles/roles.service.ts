import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './role.entity';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async findAll() {
    return this.roleModel.find().exec();
  }

  async findById(id: string) {
    return this.roleModel.findById(id).exec();
  }

  async create(role: Role) {
    const createdRole = new this.roleModel(role);
    return createdRole.save();
  }
}
