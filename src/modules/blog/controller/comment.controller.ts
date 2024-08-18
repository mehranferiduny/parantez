import {
  Body,
  Controller,

  Post,

  UseGuards,
} from "@nestjs/common";


import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SwaggerConsumes } from "src/common/enums/swagger-consumes.enum";
import { AuthGuard } from "../../auth/guards/auth.guard";

import { CreateCommentDto } from "../dto/comment.dto";
import { BlogCommentService } from "../service/comment.service";

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
}