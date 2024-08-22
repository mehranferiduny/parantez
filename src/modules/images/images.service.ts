import { Injectable } from "@nestjs/common";
import { ImageDto } from "./dto/image.dto";


@Injectable()
export class ImagesService {
  create(imageDto: ImageDto) {
    return "This action adds a new image";
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }


  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
