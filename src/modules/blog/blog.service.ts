import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/blog.dto';
import { createSlug, RandumId } from 'src/common/utils/functions.util';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BlogStatus } from './enums/status.enum';
import { PublicMassege } from 'src/common/enums/message.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PagitionGeneritor, PagitionSolver } from 'src/common/utils/pagintion.util';

@Injectable({scope:Scope.REQUEST})
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity) private readonly blogRepository:Repository<BlogEntity>,
    @Inject(REQUEST) private readonly req:Request
  ){}

 async create(blogDto:CreateBlogDto){
    const user=this.req.user
  
    let{slug,title,content,description,image,time_for_stady}=blogDto
    let slugData=slug ?? title;
    slug=createSlug(slugData)

    const ExistSlug=await this.checkSlugUnic(slug)
    if(ExistSlug){
      slug+=`-${RandumId()}`
    }

    const Blog=this.blogRepository.create({
      title,
      description,
      slug,
      content,
      time_for_stady,
      image,
      authorId:user.id,
      status:BlogStatus.Draft
    })
    await this.blogRepository.save(Blog)

    return {
      message:PublicMassege.Creaeted
    }
  }

  async checkSlugUnic(slug:string){
    const Blog=await this.blogRepository.findOneBy({slug})
    return !! Blog
  }

  async myBlog(){
    const {id}=this.req.user
    return this.blogRepository.find({
      where:{
        authorId:id
      },
      order:{
        id:"DESC"
      }
    })
  }
  async blogList(pagintinDto:PaginationDto){
    const {limit,page,skip}=PagitionSolver(pagintinDto)
   
    const[blogs,count]=await this.blogRepository.findAndCount({
      where:{
    
      },
      order:{
        id:"DESC"
      },
      skip,
      take:limit

    })
    return{
      pagination:PagitionGeneritor(page,limit,count),
      blogs
    }
  }
}
