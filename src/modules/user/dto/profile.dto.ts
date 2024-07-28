import { ApiPropertyOptional } from "@nestjs/swagger"
import { Length } from "class-validator"
import { Gender } from "../enum/gender.enum"


export class ProfileDto{
  @ApiPropertyOptional()
  @Length(2,100)
  nik_name:string
  @ApiPropertyOptional({nullable:true})
  @Length(5,200)
  bio:string
  @ApiPropertyOptional({nullable:true,format:"binary"})
  imag_profile:string
  @ApiPropertyOptional({nullable:true,format:"binary"})
  bg_Image:string
  @ApiPropertyOptional({nullable:true,enum:Gender})
  gander:string
  @ApiPropertyOptional({nullable:true})
  linkdin_profile:string
  @ApiPropertyOptional({nullable:true})
  x_profile:string
  @ApiPropertyOptional({nullable:true,example:"1999-011-15T06:31:42.297Z"})
  birthday:Date

  
}