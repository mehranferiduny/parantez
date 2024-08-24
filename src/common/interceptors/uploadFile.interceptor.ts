import { FileInterceptor } from "@nestjs/platform-express";
import { malterStoreg } from "../utils/multer.util";

export function uploadFile(filedName:string,folderName:string="images"){
  return class uploadUteil extends FileInterceptor(filedName,{
    storage:malterStoreg(folderName)
  }){}
}