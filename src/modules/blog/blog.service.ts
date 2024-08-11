import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/blog.dto';
import { createSlug } from 'src/common/utils/functions.util';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BlogStatus } from './enums/status.enum';
import { PublicMassege } from 'src/common/enums/message.enum';

@Injectable({scope:Scope.REQUEST})
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity) private readonly blogRepository:Repository<BlogEntity>,
    @Inject(REQUEST) private readonly req:Request
  ){}

 async create(blogDto:CreateBlogDto){
    const user=this.req.user
  
    let{slug,title,content,description,image,time_for_stady}=blogDto
    console.log(blogDto.image)
    let slugData=slug ?? title;
    slug=createSlug(slugData)

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
}
