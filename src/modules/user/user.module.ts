import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entites/user.entity';
import { ProfileEntity } from './entites/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([UserEntity,ProfileEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
