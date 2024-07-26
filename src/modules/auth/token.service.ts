import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class TokenServiec{
  constructor(
    private readonly jwtServiec:JwtService
  ){}
  craeteToken(payload:any){
    const token=this.jwtServiec.sign(payload,{
      secret:process.env.JWT_SECRET,
      expiresIn:60*2
    })
    return token
  }
}