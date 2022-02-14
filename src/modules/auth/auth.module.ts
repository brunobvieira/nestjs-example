import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from '../../shared/strategies/local.strategy';

import { AuthService } from './auth.service';

import { getAppSecret } from '../../shared/helpers/enviroment.helper';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { RolesGuard } from '../../shared/guards/roles.guard';

@Module({
  imports: [
    PassportModule.register({}),
    JwtModule.register({
      secret: getAppSecret(),
      signOptions: { expiresIn: '30d' }
    }),
    forwardRef(() => UserModule)
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, PassportModule]
})
export class AuthModule {}
