import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PayloadAcssesToken, PayloadToken } from "./types/payload";

@Injectable()
export class TokenServiec{
  constructor(
    private readonly jwtServiec:JwtService
  ){}
  craeteToken(payload:PayloadToken){
    const token=this.jwtServiec.sign(payload,{
      secret:process.env.JWT_SECRET_OTP,
      expiresIn:60*2
    })
    return token
  }

  verifyToken(token:string):PayloadToken{
    return this.jwtServiec.verify(token,{
      secret:process.env.JWT_SECRET_OTP,
    })
  }
  craeteAcssesToken(payload:PayloadAcssesToken){
    const token=this.jwtServiec.sign(payload,{
      secret:process.env.JWT_SECRET_ACSSES,
      expiresIn:'1y'
    })
    return token
  }

  verifyAcssesToken(token:string):PayloadAcssesToken{
    return this.jwtServiec.verify(token,{
      secret:process.env.JWT_SECRET_ACSSES,
    })
  }
}