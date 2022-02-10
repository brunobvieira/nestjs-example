import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { User } from '../../entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async createuser(createUserDto: CreateUserDto, transactionManager: EntityManager) {
    const userRepository = transactionManager.getRepository(User);

    const found = await userRepository.findOne({ email: createUserDto.email });
    if (found) {
      throw new BadRequestException('Já existe um usuário cadastrado com esse email');
    }

    let user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = await hash(createUserDto.password, 10);

    user = await userRepository.save(user);

    delete user.password;
    return user;
  }
}
