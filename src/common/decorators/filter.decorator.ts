import { applyDecorators } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";

export function Filter(){
  return applyDecorators(
    ApiQuery({name:"category",example:1,required:false}),
  )
}