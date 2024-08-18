import {

  Inject,
  Injectable,

  Scope,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { REQUEST } from "@nestjs/core";
import { Request } from "express";

import { CommentBlogEntity } from "../entities/comment.entity";
import { Repository } from "typeorm";
import { BlogService } from "./blog.service";
import { CreateCommentDto } from "../dto/comment.dto";
import { PublicMassege } from "src/common/enums/message.enum";
import { ReportText } from "src/common/utils/functions.util";

@Injectable({ scope: Scope.REQUEST })
export class BlogCommentService {
  constructor(
    @InjectRepository(CommentBlogEntity)
    private readonly blogCommentRepository: Repository<CommentBlogEntity>,

    @Inject(REQUEST) private readonly req: Request,
    private readonly blogServis: BlogService
  ) {}
  
  //!Create Comment 
   async create(commentDto:CreateCommentDto){
     const {blogId,parentId,text}=commentDto
     const {id:userId}=this.req.user
     await this.blogServis.checkExistBlogById(blogId)
     const isAcsep=ReportText(text)
      if(isAcsep){
        return {message:PublicMassege.RiportComment}
      }
     let parent=null
     if(parentId && !isNaN(parentId)){
      parent =await this.blogCommentRepository.findOneBy({id:+parentId})
     }
     await this.blogCommentRepository.insert({
      blogId,
      acseped:true,
      parentId:parent?parentId:null,
      userId,
      text
     })
     return{
      message:PublicMassege.CommentBlog
     }
   }
}