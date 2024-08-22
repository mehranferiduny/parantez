import { Injectable, NestMiddleware } from "@nestjs/common";


@Injectable()
export class addUserToReqWOV implements NestMiddleware{
  use(req: any, res: any, next: (error?: Error | any) => void) {
    console.log("excute route ...")
    next()
  }
}