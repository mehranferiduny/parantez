import { Injectable, NestMiddleware } from "@nestjs/common";
import { isJWT } from "class-validator";
import { AuthService } from "src/modules/auth/auth.service";
import { NextFunction, Request } from "express";
import { async } from "rxjs";


@Injectable()
export class addUserToReqWOV implements NestMiddleware{
  constructor(
    private readonly authServis:AuthService
  ){}
 async use(req: Request, res: Response, next:NextFunction) {

    const token = this.extractToken(req);
    if(!token) return next();
    try {
        let user = await this.authServis.validatToken(token);
        if(user) req.user = user;
    } catch (error) {
        console.log(error); 
    }
    next();
  }


  protected extractToken(request: Request) {
    const { authorization } = request.headers;
    if (!authorization || authorization?.trim() == "") {
        return null
    }
    const [bearer, token] = authorization?.split(" ");
    if (bearer?.toLowerCase() !== "bearer" || !token || !isJWT(token)) {
        return null
    }
    return token; 
}
  

}



