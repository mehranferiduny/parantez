import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entites/user.entity';
import { ProfileEntity } from './entites/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from './entites/otp.entity';
import { AuthModule } from '../auth/auth.module';
import { FollowerEntity } from './entites/follower.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,ProfileEntity,OtpEntity,FollowerEntity]),AuthModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService,TypeOrmModule],
})
export class UserModule {}
