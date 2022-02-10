import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { hash } from 'bcrypt';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { PaginatedQueryDto } from '../../shared/dtos/paginatedQuery.dto';
import { PaginationHelper } from '../../shared/helpers/pagination.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async createuser(createUserDto: CreateUserDto, transactionManager: EntityManager) {
    const userRepository = transactionManager.getRepository(User);

    const found = await userRepository.findOne({ email: createUserDto.email });
    if (found) {
      throw new BadRequestException('This email has already been taken.');
    }

    let user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = await hash(createUserDto.password, 10);

    user = await userRepository.save(user);

    delete user.password;
    return user;
  }

  async getUserById(id: string) {
    let idRegex = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if (!idRegex.test(id)) {
      throw new BadRequestException('Invalid id.');
    }

    let found = await this.userRepository.findOne(id);

    if (!found) {
      throw new NotFoundException('User not found.');
    }

    return found;
  }

  async listUsersPaginated(params: PaginatedQueryDto) {
    let qb = this.userRepository.createQueryBuilder('user');

    this.createUsersPaginatedWhere(qb, params);

    if (params.sort) {
      let order = params.order ? params.order : 'ASC';
      qb.orderBy(params.sort, order);
    }

    let { limit, offset, page } = PaginationHelper.getPagination(params);
    qb.take(limit).skip(offset);

    let res = await qb.getManyAndCount();
    return PaginationHelper.formatData(res, limit, page);
  }

  createUsersPaginatedWhere(qb: SelectQueryBuilder<User>, params: Record<string, any>) {
    if (params.query) {
      qb.andWhere('user.name ILIKE :query', { query: `%${params.query}%` });
    }
  }
}
