import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([CategoryEntity]),UserModule,AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports:[TypeOrmModule]
})
export class CategoryModule {}
