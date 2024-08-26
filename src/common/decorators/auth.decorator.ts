import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/modules/auth/guards/auth.guard";
import { RolleGuard } from "src/modules/auth/guards/rolles.guard";

export function AuthDecorator(tag:string){
  return applyDecorators(
    ApiTags(tag),
    ApiBearerAuth('Authuriztion'),
    UseGuards(AuthGuard,RolleGuard)
  )
}