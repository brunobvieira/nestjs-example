import { Body, Controller, Get, Post } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly connection: Connection,
    private readonly userService: UserService,
  ) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.connection.transaction(async (transactionManager) => {
      return this.userService.createuser(createUserDto, transactionManager);
    });
  }

  @Get()
  listUsers() {
    return [];
  }

  @Get(':id')
  getUser() {
    return {};
  }
}
