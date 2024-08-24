import { Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { ImageDto } from "./dto/image.dto";
import { MalterFile } from "src/common/utils/multer.util";
import { InjectRepository } from "@nestjs/typeorm";
import { ImageEntity } from "./entities/image.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { NotFindMassege, PublicMassege } from "src/common/enums/message.enum";


@Injectable({scope:Scope.REQUEST})
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity) private readonly imageRepository:Repository<ImageEntity>,
    @Inject(REQUEST) private readonly req:Request
  ){}
  async create(imageDto: ImageDto,image:MalterFile) {
    const userId= this.req?.user?.id
    const {alt,name}=imageDto
    const location=image?.path?.slice(7)
    await this.imageRepository.insert({
      alt:alt || name,
      location,
      name,
      userId
    })
    return {message:PublicMassege.Creaeted};
  }

  findAll() {
    const userId= this.req?.user?.id
    return this.imageRepository.find({
      where:{userId},
      order:{id:"DESC"}
    });
  }

  async findOne(id: number) {
    const userId= this.req?.user?.id
    const image =await this.imageRepository.findOne({
      where:{userId,id}
    });
    if(!image) throw new NotFoundException(NotFindMassege.NotFound)
    return image;
  }


 async remove(id: number) {
  const image=await this.findOne(id)
  await this.imageRepository.remove(image)
    return {
      message:PublicMassege.Deleted
    };
  }
}
