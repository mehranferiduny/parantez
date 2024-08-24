import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";



export class ImageDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  alt:string
  @ApiProperty()
  @IsString()
  name:string
  @ApiProperty({format:"binary"})
  image:string
}
