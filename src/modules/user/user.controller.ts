import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Response, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Connection } from 'typeorm';
import { User } from '../../entities/user.entity';
import { PaginatedQueryDto } from '../../shared/dtos/paginatedQuery.dto';
import { PaginatedResponseDto } from '../../shared/dtos/paginatedResponse.dto';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
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
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Get()
  async listUsers(@Query() params: PaginatedQueryDto) {
    return this.userService.listUsersPaginated(params);
  }

  @ApiOkResponse({
    description: 'Return user found',
    type: User
  })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.connection.transaction(async (transactionManager) => {
      return this.userService.updateUser(id, updateUserDto, transactionManager);
    });
  }

  @ApiNoContentResponse({description: 'No content'})
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.connection.transaction(async (transactionManager) => {
      return this.userService.deleteUser(id, transactionManager);
    });
  }
}
