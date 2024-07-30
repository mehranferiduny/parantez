import { ParseFilePipe, UploadedFiles } from "@nestjs/common";

export function UploadedOptionFile(){
  return UploadedFiles(new ParseFilePipe({
    fileIsRequired:false,
    validators:[]
  }))
}