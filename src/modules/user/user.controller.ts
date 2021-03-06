import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, Response, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Connection } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Roles } from '../../shared/decorators/roles.decorator';
import { PaginatedQueryDto } from '../../shared/dtos/paginatedQuery.dto';
import { PaginatedResponseDto } from '../../shared/dtos/paginatedResponse.dto';
import { Role } from '../../shared/enums/role.enum';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../shared/guards/roles.guard';
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get()
  async listUsers(@Query() params: PaginatedQueryDto) {
    return this.userService.listUsersPaginated(params);
  }

  @ApiOkResponse({
    description: 'Return user found',
    type: User
  })
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiOkResponse({
    description: 'Return user updated',
    type: User
  })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.connection.transaction(async (transactionManager) => {
      return this.userService.updateUser(id, updateUserDto, transactionManager);
    });
  }

  @ApiNoContentResponse({description: 'No content'})
  @ApiNotFoundResponse()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.connection.transaction(async (transactionManager) => {
      return this.userService.deleteUser(id, transactionManager);
    });
  }
}
