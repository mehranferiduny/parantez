import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { Observable } from "rxjs";
import { Role_Key } from "src/common/decorators/roles.decorator";
import { Roles } from "src/common/enums/roul.enum";

@Injectable()
export class RolleGuard implements CanActivate{
  constructor(
    private readonly reflector:Reflector
  ){}
  canActivate(context: ExecutionContext) {
    const RequardRoll=this.reflector.getAllAndOverride<Roles[]>(
      Role_Key,
      [
        context.getHandler(),
        context.getClass()

      ])
    if(!RequardRoll || RequardRoll.length == 0) return true;
    const request:Request=context.switchToHttp().getRequest<Request>();
    const user=request.user
    const userRolle=user?.roles ?? Roles.User;
    if(user.roles === Roles.Admin) return true
    if(RequardRoll.includes(userRolle as Roles)) return true
    throw new ForbiddenException()
  }
  
}