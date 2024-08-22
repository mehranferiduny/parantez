import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { BlogService } from "../service/blog.service";
import { CreateBlogDto, FilterBlogDto, UpdeatBlogDto } from "../dto/blog.dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SwaggerConsumes } from "src/common/enums/swagger-consumes.enum";
import { AuthGuard } from "../../auth/guards/auth.guard";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { skipAuth } from "src/common/decorators/skip-auth.decorator";
import { Pagination } from "src/common/decorators/paginashen.decorator";
import { Filter } from "src/common/decorators/filter.decorator";

@Controller("blog")
@ApiTags("Blog")
@ApiBearerAuth("Authuriztion")
@UseGuards(AuthGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post("/")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  createBlog(@Body() blogDto: CreateBlogDto) {
    return this.blogService.create(blogDto);
  }

  @Get("my")
  myBlog() {
    return this.blogService.myBlog();
  }

  @Get("/slug-find/:slug")
  @skipAuth()
  @Pagination()
  findOneBySlug(@Param("slug") slug:string,@Query() pagintinDto: PaginationDto) {
    return this.blogService.findOneBySlug(pagintinDto,slug);
  }

  @Get()
  @skipAuth()
  @Pagination()
  @Filter()
  find(@Query() pagintinDto: PaginationDto, @Query() filterDto: FilterBlogDto) {
    return this.blogService.blogList(pagintinDto, filterDto);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.blogService.delete(id);
  }

  @Put(":id")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() blogDto: UpdeatBlogDto
  ) {
    return this.blogService.update(id, blogDto);
  }

  @Get("like/:id")
  likeToggel(@Param("id", ParseIntPipe) id: number) {
    return this.blogService.likeToggel(id);
  }
  @Get("bookmark/:id")
  bookmarkToggel(@Param("id", ParseIntPipe) id: number) {
    return this.blogService.bookmarkToggel(id);
  }
}
