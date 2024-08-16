import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class PaginationDto{
  @ApiPropertyOptional({type:"integer"})
  @IsOptional()
  page:number;
  @ApiPropertyOptional({type:"integer"})
  @IsOptional()
  limit:number;
}