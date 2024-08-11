import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsString, Length } from "class-validator";

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
}