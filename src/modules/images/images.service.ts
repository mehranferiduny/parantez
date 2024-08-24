import { Injectable } from "@nestjs/common";
import { ImageDto } from "./dto/image.dto";
import { MalterFile } from "src/common/utils/multer.util";


@Injectable()
export class ImagesService {
  create(imageDto: ImageDto,image:MalterFile) {
    return image;
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
