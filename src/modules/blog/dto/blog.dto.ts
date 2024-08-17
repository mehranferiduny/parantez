import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumberString, IsOptional, IsString, Length } from "class-validator";

export class CreateBlogDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(10,150)
  title:string
  
  @ApiPropertyOptional()
  slug:string

  @ApiPropertyOptional()
  @IsString()
  image:string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  time_for_stady:string;



  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(10,300)
  description:string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(100)
  content:string


  @ApiProperty({type:String,isArray:true})
  @IsString()
  categoris:string[] | string
}

export class UpdeatBlogDto extends PartialType(CreateBlogDto){
  
} 

export class FilterBlogDto{
  @ApiPropertyOptional({type:String})
  @IsString()
  @IsOptional()
  category:string
  @ApiPropertyOptional({type:String})
  @IsString()
  @IsOptional()
  search:string
}