import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PayloadToken } from "./types/payload";

@Injectable()
export class TokenServiec{
  constructor(
    private readonly jwtServiec:JwtService
  ){}
  craeteToken(payload:PayloadToken){
    const token=this.jwtServiec.sign(payload,{
      secret:process.env.JWT_SECRET,
      expiresIn:60*2
    })
    return token
  }
}