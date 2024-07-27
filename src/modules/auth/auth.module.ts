import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { TokenServiec } from './token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[UserModule],
  controllers: [AuthController],
  providers: [AuthService,TokenServiec,JwtService],
  exports: [AuthService,TokenServiec,JwtService],
})
export class AuthModule {}
