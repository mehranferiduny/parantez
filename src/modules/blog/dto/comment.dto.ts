import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumberString, IsOptional, IsString, Length } from "class-validator";

export class CreateCommentDto{

  @ApiProperty()
  @IsString()
  @Length(5)
  text:string

  @ApiProperty()
  @IsNumberString()
  blogId:number

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  parentId:number

}