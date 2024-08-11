import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/blog.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('blog')
@ApiTags("Blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post("/")
  @ApiBearerAuth('Authuriztion')
  @UseGuards(AuthGuard)
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  createBlog(@Body() blogDto:CreateBlogDto){
    return this.blogService.create(blogDto)
  }
}
