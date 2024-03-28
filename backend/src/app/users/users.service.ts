import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }

  async create(user: User): Promise<User> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    const newUser = new this.userModel({ ...user, password: hashedPassword });
    return newUser.save();
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

  private async generateToken(
    payload: any,
    expiresIn: string,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn });
  }

  async updateToken(username: string, refreshToken: string) {
    await this.userModel
      .updateOne({ username }, { refresh_token: refreshToken })
      .exec();
  }

  async authLogin(username: string, password: string) {
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new NotFoundException(`User ${username} not found`);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user._id };
    const access_token = await this.generateToken(payload, '1h');
    const refresh_token = await this.generateToken(payload, '7d');

    await this.updateToken(username, refresh_token);

    return {
      access_token: access_token,
      refresh_token: refresh_token,
    };
  }
}
