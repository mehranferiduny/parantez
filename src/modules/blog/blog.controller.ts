import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/blog.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { skipAuth } from 'src/common/decorators/skip-auth.decorator';
import { Pagination } from 'src/common/decorators/paginashen.decorator';

@Controller('blog')
@ApiTags("Blog")
@ApiBearerAuth('Authuriztion')
@UseGuards(AuthGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post("/")
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  createBlog(@Body() blogDto:CreateBlogDto){
    return this.blogService.create(blogDto)
  }

  @Get('my')
  myBlog(){
    return this.blogService.myBlog();
  }

  @Get()
  @skipAuth()
  @Pagination()
  find(@Query() pagintinDto:PaginationDto){
    return this.blogService.blogList(pagintinDto);
  }

}
