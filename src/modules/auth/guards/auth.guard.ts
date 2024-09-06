import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { isJWT } from "class-validator";
import {  Request } from "express";
import {  AuthMassege, PublicMassege } from "src/common/enums/message.enum";
import { AuthService } from "../auth.service";
import { Reflector } from "@nestjs/core";
import { SKIP_AUTH } from "src/common/decorators/skip-auth.decorator";
import { UserStatus } from "src/modules/user/enum/status.enum";


@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private readonly authServis:AuthService,
    private readonly reflector:Reflector
  ){}
  async canActivate(context: ExecutionContext) {
    const IsAuthSkip=this.reflector.get<Boolean>(SKIP_AUTH,context.getHandler())
    if(IsAuthSkip) return true;
    const contextHttp=context.switchToHttp();
    const request:Request=contextHttp.getRequest<Request>();
    const token=this.extractToken(request)
    
    request.user= await this.authServis.validatToken(token)
    if(request?.user?.status== UserStatus.Block){
      throw new ForbiddenException(AuthMassege.BlockUser)
    }
    return true;
  }

  protected extractToken(req:Request){
    const {authorization}=req.headers
    if(!authorization || authorization?.trim() == " ") throw new UnauthorizedException(PublicMassege.TryLogin)
    const [bearer,token]=authorization?.split(" ");
  if(bearer?.toLowerCase() !== "bearer" || !token || !isJWT(token)) throw new UnauthorizedException(PublicMassege.TryAgin)
    return token
  }
}