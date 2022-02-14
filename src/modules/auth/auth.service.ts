import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneWithPassword({ email });
    if (user && compareSync(password, user.password)) {
      delete user.password;
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };

    return {
      ...user,
      access_token: this.jwtService.sign(payload)
    };
  }
}
