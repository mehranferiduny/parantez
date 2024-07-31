import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PayloadAcssesToken, PayloadEmailToken, PayloadPhoneToken, PayloadToken } from "./types/payload";
import { BadRequestExceptionMasseage } from "src/common/enums/message.enum";

@Injectable()
export class TokenServiec{
  constructor(
    private readonly jwtServiec:JwtService
  ){}
  craeteEmailToken(payload:PayloadEmailToken){
    const token=this.jwtServiec.sign(payload,{
      secret:process.env.JWT_SECRET_EMAIL,
      expiresIn:60*2
    })
    return token
  }

  verifyEmailToken(token:string):PayloadEmailToken{
    try {
      return this.jwtServiec.verify(token,{
        secret:process.env.JWT_SECRET_EMAIL,
      })
    } catch (error) {
      throw new BadRequestException(BadRequestExceptionMasseage.BatTryAgen)
    }

  }
  craetePhoneToken(payload:PayloadPhoneToken){
    const token=this.jwtServiec.sign(payload,{
      secret:process.env.JWT_SECRET_PHONE,
      expiresIn:60*2
    })
    return token
  }

  verifyPhoneToken(token:string):PayloadPhoneToken{
    try {
      return this.jwtServiec.verify(token,{
        secret:process.env.JWT_SECRET_PHONE,
      })
    } catch (error) {
      throw new BadRequestException(BadRequestExceptionMasseage.BatTryAgen)
    }

  }
  craeteToken(payload:PayloadToken){
    const token=this.jwtServiec.sign(payload,{
      secret:process.env.JWT_SECRET_OTP,
      expiresIn:60*2
    })
    return token
  }

  verifyToken(token:string):PayloadToken{
    try {
      return this.jwtServiec.verify(token,{
        secret:process.env.JWT_SECRET_OTP,
      })
    } catch (error) {
      throw new BadRequestException(BadRequestExceptionMasseage.BatTryAgen)
    }
   
  }
  craeteAcssesToken(payload:PayloadAcssesToken){
    const token=this.jwtServiec.sign(payload,{
      secret:process.env.JWT_SECRET_ACSSES,
      expiresIn:'1y'
    })
    return token
  }

  verifyAcssesToken(token:string):PayloadAcssesToken{
    try {
      return this.jwtServiec.verify(token,{
        secret:process.env.JWT_SECRET_ACSSES,
      })
    } catch (error) {
      throw new BadRequestException(BadRequestExceptionMasseage.BatTryAgen)
    }
   
  }
}