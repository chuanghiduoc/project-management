import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') userId: string): Promise<User | null> {
    return this.usersService.findOne(userId);
  }

  @Post('register')
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @Put(':id')
  update(
    @Param('id') userId: string,
    @Body() updatedUser: User,
  ): Promise<User | null> {
    return this.usersService.update(userId, updatedUser);
  }

  @Delete(':id')
  delete(@Param('id') userId: string): Promise<User | null> {
    return this.usersService.delete(userId);
  }

  @Put(':id/projects')
  updateProjects(
    @Param('id') userId: string,
    @Body('projectIds') projectIds: string[],
  ): Promise<User | null> {
    return this.usersService.updateProjects(userId, projectIds);
  }
  @Put(':id/roles')
  updateRoles(
    @Param('id') userId: string,
    @Body('roleIds') roleIds: string[],
  ): Promise<User | null> {
    return this.usersService.updateRoles(userId, roleIds);
  }
  @Post('login')
  authLogin(@Body() signInDto: Record<string, any>) {
    return this.usersService.authLogin(signInDto.username, signInDto.password);
  }
}
