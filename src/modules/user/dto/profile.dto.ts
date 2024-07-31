import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsEnum, IsMobilePhone, IsOptional, Length } from "class-validator"
import { Gender } from "../enum/gender.enum"
import { InvalidFormatMassage } from "src/common/enums/message.enum"


export class ProfileDto{
  @ApiPropertyOptional({nullable:true})
  @IsOptional()
  @Length(2,100)
  nik_name:string
  @ApiPropertyOptional({nullable:true})
  @IsOptional()
  @Length(5,200)
  bio:string
  @ApiPropertyOptional({nullable:true,format:"binary"})
  @IsOptional()
  imag_profile:string
  @ApiPropertyOptional({nullable:true,format:"binary"})
  @IsOptional()
  bg_Image:string
  @ApiPropertyOptional({nullable:true,enum:Gender})
  @IsOptional()
  @IsEnum(Gender)
  gander:string
  @ApiPropertyOptional({nullable:false})
  @IsOptional()
  linkdin_profile:string
  @ApiPropertyOptional({nullable:true})
  @IsOptional()
  x_profile:string
  @ApiPropertyOptional({nullable:true,example:"1999-11-15T06:31:42.297Z"})
  @IsOptional()
  birthday:Date

  
}


export class ChenageEmailDto{
  @ApiProperty()
  @IsEmail({},{message:InvalidFormatMassage.InvalidEmail})
  email:string
}
export class ChenagePhoneDto{
  @ApiProperty()
  @IsMobilePhone("fa-IR",{},{message:InvalidFormatMassage.InvalidEmail})
  Phone:string
}