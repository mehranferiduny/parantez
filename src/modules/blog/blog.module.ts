import { Module } from "@nestjs/common";
import { BlogService } from "./service/blog.service";
import { BlogController } from "./controller/blog.controller";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlogEntity } from "./entities/blog.entity";
import { BlogLikeEntity } from "./entities/like.entity";
import { BlogBookmarkEntity } from "./entities/bookmark.entity";
import { CommentBlogEntity } from "./entities/comment.entity";
import { BlogCtaegoryEntity } from "./entities/bolg-category.entity";
import { CategoryService } from "../category/category.service";
import { CategoryEntity } from "../category/entities/category.entity";
import { BlogCommentController } from "./controller/comment.controller";
import { BlogCommentService } from "./service/comment.service";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      BlogEntity,
      BlogLikeEntity,
      BlogBookmarkEntity,
      CommentBlogEntity,
      BlogCtaegoryEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [BlogController,BlogCommentController],
  providers: [BlogService, CategoryService,BlogCommentService],
})
export class BlogModule {}
