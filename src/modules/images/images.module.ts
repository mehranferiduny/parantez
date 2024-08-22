import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entities/image.entity';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([ImageEntity])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
