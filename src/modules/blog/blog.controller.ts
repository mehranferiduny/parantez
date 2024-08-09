import { Body, Controller, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/blog.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post("/")
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  createBlog(@Body() blogDto:CreateBlogDto){
    return this.blogService.create(blogDto)
  }
}
