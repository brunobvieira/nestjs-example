import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Connection } from 'typeorm';
import { User } from '../../entities/user.entity';
import { PaginatedQueryDto } from '../../shared/dtos/paginatedQuery.dto';
import { PaginatedResponseDto } from '../../shared/dtos/paginatedResponse.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly connection: Connection, private readonly userService: UserService) {}

  @ApiCreatedResponse({
    description: 'Return user created',
    type: User
  })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.connection.transaction(async (transactionManager) => {
      return this.userService.createuser(createUserDto, transactionManager);
    });
  }

  @ApiOkResponse({
    description: 'Return user created',
    type: PaginatedResponseDto
  })
  @Get()
  async listUsers(@Query() params: PaginatedQueryDto) {
    return this.userService.listUsersPaginated(params);
  }

  @ApiOkResponse({
    description: 'Return user found',
    type: User
  })
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.connection.transaction(async (transactionManager) => {
      return this.userService.updateUser(id, updateUserDto, transactionManager);
    });
  }

  //@todo updateUser
  //@todo deleteUser
  //@todo protect endpoints
  //@todo login endpoint with jwt
}
