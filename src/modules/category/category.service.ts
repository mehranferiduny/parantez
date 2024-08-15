import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ConflictExceptionMassage, NotFindMassege, PublicMassege } from 'src/common/enums/message.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PagitionGeneritor, PagitionSolver } from 'src/common/utils/pagintion.util';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity) private readonly categoryRepository:Repository<CategoryEntity>,
  ){}
  async create(createCategoryDto: CreateCategoryDto) {
   let{title,priority}=createCategoryDto
   title=await this.checkResaltByTitle(title)
   const category= this.categoryRepository.create({
    title,
    priority
   });
   await this.categoryRepository.save(category)
   return{
    message:PublicMassege.Creaeted
   }
  }
 

  async InsertByTitle(title:string){
    const category= this.categoryRepository.create({title})
     return await this.categoryRepository.save(category)
  }

  async checkResaltByTitle(title:string){
    title=title?.trim()?.toLowerCase();
    const categoryTitle=await this.categoryRepository.findOneBy({title})
    if(categoryTitle) throw new ConflictException(ConflictExceptionMassage.categoryTitle)
      return title;

  }

   async findAll(paginationDto:PaginationDto) {
    const {limit,page,skip}=PagitionSolver(paginationDto)
    const[category,count]= await this.categoryRepository.findAndCount({
      where:{},
      skip,
      take:limit
    });
    return{
      pagtion:PagitionGeneritor(page,limit,count),
      category

    }
  }

  async findOne(id: number) {
   const category=await this.categoryRepository.findOneBy({id})
   if(!category) throw new NotFoundException(NotFindMassege.NotCategory)
    return category

  }

  async findOneByTitle(title: string) {
    return await this.categoryRepository.findOneBy({title})
   
 
   }
 

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category= await this.findOne(id)
    const{priority,title}=updateCategoryDto
    if(title) category.title=title
    if(priority) category.priority=priority
    await this.categoryRepository.save(category)
    return {
      message:PublicMassege.Updaeted
    }
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.categoryRepository.delete({id})
    return {
      message:PublicMassege.Deleted
    }
  }
}
