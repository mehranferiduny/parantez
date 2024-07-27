import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { ConflictExceptionMassage, PublicMassege } from 'src/common/enums/message.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

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

  async checkResaltByTitle(title:string){
    title=title?.trim()?.toLowerCase();
    const categoryTitle=await this.categoryRepository.findOneBy({title})
    if(categoryTitle) throw new ConflictException(ConflictExceptionMassage.categoryTitle)
      return title;

  }

  findAll(paginationDto:PaginationDto) {
    console.log(paginationDto)
    return this.categoryRepository.findBy({});
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
