import {

  BadRequestException,
  forwardRef,
  Inject,
  Injectable,

  NotFoundException,

  Scope,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { REQUEST } from "@nestjs/core";
import { Request } from "express";

import { CommentBlogEntity } from "../entities/comment.entity";
import { IsNull, Repository } from "typeorm";
import { BlogService } from "./blog.service";
import { CreateCommentDto } from "../dto/comment.dto";
import { BadRequestExceptionMasseage, NotFindMassege, PublicMassege } from "src/common/enums/message.enum";
import { ReportText } from "src/common/utils/functions.util";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { PagitionGeneritor, PagitionSolver } from "src/common/utils/pagintion.util";

@Injectable({ scope: Scope.REQUEST })
export class BlogCommentService {
  constructor(
    @InjectRepository(CommentBlogEntity)
    private readonly blogCommentRepository: Repository<CommentBlogEntity>,

    @Inject(REQUEST) private readonly req: Request,
    @Inject(forwardRef(()=>BlogService))private readonly blogServis: BlogService
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

   async checkExistComentById(id:number){
    const comment=await this.blogCommentRepository.findOneBy({id})
    if(!comment) throw new NotFoundException(NotFindMassege.NotPost)
      return comment
   }
   //! Acseped Comment
   async acsepet(id:number){
    const comment=await this.checkExistComentById(id)
    if(comment.acseped) throw new BadRequestException(BadRequestExceptionMasseage.AllredyAcsepted)
      comment.acseped=true;
    await this.blogCommentRepository.save(comment)
    return{ 
      message:PublicMassege.Updaeted

    }
   }
   //! Rejected Comment
   async reject(id:number){
    const comment=await this.checkExistComentById(id)
    if(!comment.acseped) throw new BadRequestException(BadRequestExceptionMasseage.AllredyReject)
      comment.acseped=false;
    await this.blogCommentRepository.save(comment)
    return{ 
      message:PublicMassege.Updaeted

    }
   }

   async findCommentsOfBlog( pagintinDto: PaginationDto,blogId:number){
    const {limit,page,skip}=PagitionSolver(pagintinDto)
    const [comments,count]=await this.blogCommentRepository.findAndCount({
      where:{
        blogId,
        parentId:IsNull()
      },
      relations:{

        user:{profile:true},

        chiled:{
          user:{profile:true},
          chiled:{
            user:{profile:true},
          }
        }
      },
      select:{
      
        user:{
          username:true,
          profile:{
            nik_name:true
          },
          
        },
        chiled:{
          text:true,
          created_at:true,
          parentId:true,
          user:{
            username:true,
            profile:{
              nik_name:true
            }
          },
          chiled:{
            text:true,
            created_at:true,
            parentId:true,
            user:{
              username:true,
              profile:{
                nik_name:true
              }
            }
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