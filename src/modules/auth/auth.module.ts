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
import { GoogleControler } from './google.controller';
import { GoogleStrategy } from './strategy/google.strategy';


@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,ProfileEntity,OtpEntity])],
  controllers: [AuthController,GoogleControler],
  providers: [AuthService,TokenServiec,JwtService,GoogleStrategy],
  exports: [AuthService,TokenServiec,JwtService,TypeOrmModule,GoogleStrategy],
})
export class AuthModule {}
