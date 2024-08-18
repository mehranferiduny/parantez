import {
  Body,
  Controller,

  Get,

  Param,

  ParseIntPipe,

  Post,

  Put,

  Query,

  UseGuards,
} from "@nestjs/common";


import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SwaggerConsumes } from "src/common/enums/swagger-consumes.enum";
import { AuthGuard } from "../../auth/guards/auth.guard";

import { CreateCommentDto } from "../dto/comment.dto";
import { BlogCommentService } from "../service/comment.service";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { Pagination } from "src/common/decorators/paginashen.decorator";

@Controller("blog-comment")
@ApiTags("Blog")
@ApiBearerAuth("Authuriztion")
@UseGuards(AuthGuard)
export class BlogCommentController {
  constructor(private readonly blogCommentService: BlogCommentService) {}

  @Post("/")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  createComment(@Body() commentDto: CreateCommentDto) {
    return this.blogCommentService.create(commentDto);
  }

  @Get()
  @Pagination()
  find(@Query() pagintinDto: PaginationDto) {
    return this.blogCommentService.find(pagintinDto);
}

  @Put("/acsept/:id")
  acsept (@Param("id",ParseIntPipe) id:number){
    return this.blogCommentService.acsepet(id)
  }

  @Put("/reject/:id")
  reject(@Param("id",ParseIntPipe) id:number){
    return this.blogCommentService.reject(id)
  }
}