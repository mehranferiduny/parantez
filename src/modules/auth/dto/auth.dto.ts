import { ApiProperty } from "@nestjs/swagger"
import { AuthMethod } from "../enums/method.enum"
import { IsEnum, IsString, Length } from "class-validator"
import { AuthType } from "../enums/type.enum"

export class AuthDto{

  @ApiProperty({enum:AuthMethod})
  @IsEnum(AuthMethod)
  method:AuthMethod
  @ApiProperty({enum:AuthType})
  @IsEnum(AuthType)
  type:string
  @ApiProperty()
  @IsString()
  @Length(3,100)
  username:string
}