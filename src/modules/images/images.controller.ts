import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from "@nestjs/common";
import { ImagesService } from "./images.service";
import { ImageDto } from "./dto/image.dto";
import { AuthDecorator } from "src/common/decorators/auth.decorator";


@Controller("images")
@AuthDecorator("Image")
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Body() imageDto: ImageDto) {
    return this.imagesService.create(imageDto);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.imagesService.findOne(+id);
  }


  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.imagesService.remove(+id);
  }
}
