import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { TokenServiec } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entites/user.entity';
import { ProfileEntity } from '../user/entites/profile.entity';
import { OtpEntity } from '../user/entites/otp.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,ProfileEntity,OtpEntity])],
  controllers: [AuthController],
  providers: [AuthService,TokenServiec,JwtService],
  exports: [AuthService,TokenServiec,JwtService,TypeOrmModule],
})
export class AuthModule {}
