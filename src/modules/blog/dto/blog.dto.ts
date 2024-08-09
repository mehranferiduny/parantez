import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateBlogDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(10,150)
  title:string
  
  @ApiPropertyOptional()
  slug:string

  @ApiProperty()
  @IsNotEmpty()
  time_for_stady:string;

  @ApiPropertyOptional({format:"binary"})
  image:string;

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