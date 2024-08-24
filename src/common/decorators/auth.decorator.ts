import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";

export function AuthDecorator(tag:string){
  return applyDecorators(
    ApiTags(tag),
    ApiBearerAuth('Authuriztion'),
    UseGuards(AuthGuard)
  )
}