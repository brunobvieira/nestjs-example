import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Response } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiBadRequestResponse()
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
  @ApiNotFoundResponse()
  @Get(':id')
  async sgetUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOkResponse({
    description: 'Return user updated',
    type: User
  })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.connection.transaction(async (transactionManager) => {
      return this.userService.updateUser(id, updateUserDto, transactionManager);
    });
  }

  @ApiNoContentResponse({description: 'No content'})
  @ApiNotFoundResponse()
  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.connection.transaction(async (transactionManager) => {
      return this.userService.deleteUser(id, transactionManager);
    });
  }

  //@todo protect endpoints
  //@todo login endpoint with jwt
}
