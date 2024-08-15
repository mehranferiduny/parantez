import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { BlogLikeEntity } from './entities/like.entity';
import { BlogBookmarkEntity } from './entities/bookmark.entity';
import { CommentBlogEntity } from './entities/comment.entity';
import { BlogCtaegoryEntity } from './entities/bolg-category.entity';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from '../category/entities/category.entity';

@Module({
  imports:[AuthModule,TypeOrmModule.forFeature([BlogEntity,BlogLikeEntity,BlogBookmarkEntity,CommentBlogEntity,BlogCtaegoryEntity,CategoryEntity])],
  controllers: [BlogController],
  providers: [BlogService,CategoryService],
})
export class BlogModule {}
