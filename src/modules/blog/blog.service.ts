import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './entities/blog.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateBlogDto, FilterBlogDto } from './dto/blog.dto';
import { createSlug, RandumId } from 'src/common/utils/functions.util';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BlogStatus } from './enums/status.enum';
import { BadRequestExceptionMasseage, PublicMassege } from 'src/common/enums/message.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PagitionGeneritor, PagitionSolver } from 'src/common/utils/pagintion.util';
import { CategoryService } from '../category/category.service';
import { isArray, IsArray } from 'class-validator';
import { BlogCtaegoryEntity } from './entities/bolg-category.entity';
import { EntityName } from 'src/common/enums/entity.enum';

@Injectable({scope:Scope.REQUEST})
export class BlogService {
  constructor(
    @InjectRepository(BlogEntity) private readonly blogRepository:Repository<BlogEntity>,
    @InjectRepository(BlogCtaegoryEntity) private readonly blogCategoryRepository:Repository<BlogCtaegoryEntity>,
    @Inject(REQUEST) private readonly req:Request,
    private readonly categoryServis:CategoryService
  ){}

 async create(blogDto:CreateBlogDto){
   
  
    let{slug,title,content,description,image,time_for_stady,categoris}=blogDto
    let slugData=slug ?? title;
    slug=createSlug(slugData)
  
    if(!isArray(categoris) && typeof categoris == "string" ){
      categoris=categoris.split(",")
    }else if(!isArray(categoris)){
      throw new BadRequestException(BadRequestExceptionMasseage.InValidCategoryData)
    }

   
      

      
    const user=this.req.user
   
    const ExistSlug=await this.checkSlugUnic(slug)
    if(ExistSlug){
      slug+=`-${RandumId()}`
    }

    let Blog=this.blogRepository.create({
      title,
      description,
      slug,
      content,
      time_for_stady,
      image,
      authorId:user.id,
      status:BlogStatus.Draft
    })
    Blog=await this.blogRepository.save(Blog)

    for (const categoryTitle of categoris) {
        let category =await this.categoryServis.findOneByTitle(categoryTitle);
        if(!category){
          category= await this.categoryServis.InsertByTitle(categoryTitle)
        }

        await this.blogCategoryRepository.insert({
          blogId:Blog.id,
          categoryId:category.id
        })

    }

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
  async blogList(pagintinDto:PaginationDto,filterDto:FilterBlogDto){
    const {limit,page,skip}=PagitionSolver(pagintinDto)
    let {category,search}=filterDto



    // let where:FindOptionsWhere<BlogEntity>={}
    let where=''
   
    if(category){
    //  where['category']={
    //   category:{
    //     title:category
    //   }
    //  } 
        
         category=category.toLowerCase();
         if(where.length > 0 ) where += ' AND '
         where += 'category.title = LOWER(:category)'
        console.log(where)
    }
    if(search){
     if(where.length > 0 ) where+= ' AND '

     search= `%${search}%`
     where+='CONCAT(blog.title , blog.content , blog.description) ILIKE :search'


    }

    const [blogs,count]=await this.blogRepository.createQueryBuilder(EntityName.Blog)
    .leftJoin("blog.categoris","categoris")
    .leftJoin("categoris.category","category")
    .addSelect(['categoris.id','category.title'])
    .where(where,{category,search})
    .orderBy("blog.id","DESC")
    .take(limit)
    .skip(skip)
    .getManyAndCount()


 
   
    // const[blogs,count]=await this.blogRepository.findAndCount({
    //   relations:{
    //    categoris:{
    //     category:true
    //    }
    //   },
    //   where:{},
    //   select:{
    //     categoris:{
    //       id:true,
          
    //       category:
    //       {
       
    //         title:true
    //       }

    //   }},
    //   order:{
    //     id:"DESC"
    //   },
    //   skip,
    //   take:limit

    // })
    return{
      pagination:PagitionGeneritor(page,limit,count),
      blogs
    }
  }
}
