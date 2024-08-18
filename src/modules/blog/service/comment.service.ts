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
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PagitionGeneritor, PagitionSolver } from "src/common/utils/pagintion.util";

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
     let acseped=true
      if(isAcsep){
        acseped=false
      }
     let parent=null
     if(parentId && !isNaN(parentId)){
      parent =await this.blogCommentRepository.findOneBy({id:+parentId})
     }
     await this.blogCommentRepository.insert({
      blogId,
      acseped,
      parentId:parent?parentId:null,
      userId,
      text
     })
     return{
      message:PublicMassege.CommentBlog
     }
   }

   //! Get All Comment
   async find( pagintinDto: PaginationDto){
    const {limit,page,skip}=PagitionSolver(pagintinDto)
    const [comments,count]=await this.blogCommentRepository.findAndCount({
      where:{},
      relations:{
        user:{profile:true},
        blog:true
      },
      select:{
        blog:{
          title:true
        },
        user:{
          username:true,
          profile:{
            nik_name:true
          }
        }
      },
      skip,
      take:limit
    })
    return{
      pagition:PagitionGeneritor(page,limit,count),
      comments
    }
   }
}