import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async update(userId: string, updatedUser: User): Promise<User | null> {
    const existingUser = await this.userModel.findById(userId).exec();

    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    // Update properties
    existingUser.username = updatedUser.username;
    existingUser.email = updatedUser.email;
    existingUser.password = updatedUser.password;
    existingUser.projects = updatedUser.projects;
    existingUser.roles = updatedUser.roles;
    existingUser.refresh_token = updatedUser.refresh_token;
    existingUser.updatedAt = new Date();

    return existingUser.save();
  }

  async delete(userId: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(userId).exec();
  }

  async updateProjects(
    userId: string,
    projectIds: string[],
  ): Promise<User | null> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.projects = [
      ...user.projects,
      ...projectIds.map((id) => new mongoose.Types.ObjectId(id)),
    ];
    user.updatedAt = new Date();

    return user.save();
  }
  async updateRoles(userId: string, roleIds: string[]): Promise<User | null> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    user.roles = roleIds.map((id) => new mongoose.Types.ObjectId(id));
    user.updatedAt = new Date();

    return user.save();
  }
}
