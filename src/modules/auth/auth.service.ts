import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneWithPassword({ email });

    if (user && compareSync(password, user.password)) {
      delete user.password;
      return user;
    }

    return null;
  }
}
