import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// modules
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule],
  controllers: [],
  providers: []
})
export class AppModule {}
