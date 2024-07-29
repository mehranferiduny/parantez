import { Request } from "express";
import { mkdirSync } from "fs";
import { extname, join } from "path";

export type MalterFile=Express.Multer.File
export type CallbackDestination=(error: Error | null, destination: string) => void;
export type CallbackFilename=(error: Error | null, filename: string) => void;
export function malterDestition(fildName:string){
  return function(req:Request,file:MalterFile,callback:CallbackDestination):void{
    const path=join("public","uploads",fildName)
    mkdirSync(path,{recursive:true})
    callback(null,path)
}
  
}
export function malterFileName(req:Request,file:MalterFile,callback:CallbackDestination):void{
  const ext=extname(file.originalname)
  const nameFile=`${Date.now()}.${ext}`
  callback(null,nameFile)
  
}