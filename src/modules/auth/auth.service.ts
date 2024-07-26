import { BadRequestException, Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthType } from './enums/type.enum';
import { AuthMethod } from './enums/method.enum';
import { isEmail, isMobilePhone } from 'class-validator';
import { UserEntity } from '../user/entites/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../user/entites/profile.entity';
import { AuthMassege, BadRequestExceptionMasseage } from 'src/common/enums/message.enum';
import { randomInt } from 'crypto';
import { OtpEntity } from '../user/entites/otp.entity';
import { TokenServiec } from './token.service';
import { Request, Response } from 'express';
import { AuthRespons } from './types/response';
import { CookieKeys } from 'src/common/enums/cookie.enum';
import { REQUEST } from '@nestjs/core';

@Injectable({scope:Scope.REQUEST})
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private readonly profileRepository:Repository<ProfileEntity>,
    @InjectRepository(OtpEntity) private readonly otpRepository:Repository<OtpEntity>,
    @Inject(REQUEST) private req:Request,
    private readonly tokenServiec:TokenServiec
  ){}

 async userExistence(authDto:AuthDto,res:Response){
    const {method,type,username}=authDto
    let result:AuthRespons;
    switch (type) {
      case AuthType.login: result= await this.login(method,username); return this.sendRespons(res,result)
      case AuthType.register: result= await this.register(method,username);return this.sendRespons(res,result)
      default:
        throw new UnauthorizedException()
    }


  }

 async login(method:AuthMethod,username:string){
    const vlaidUsername= this.usernameValidat(method,username)
    let user:UserEntity=await this.chekExistUser(method,vlaidUsername)
    if(!user) throw new UnauthorizedException(AuthMassege.AcontNotFind)
      const otp=await this.saveOtp(user.id)
    const token= this.tokenServiec.craeteToken({userId:user.id})
    return{
        message:AuthMassege.secessExsitCode,
     token,
      code:otp.code
    }

     
  }
  async register(method:AuthMethod,username:string){
    const vlaidUsername= this.usernameValidat(method,username)
    let user:UserEntity=await this.chekExistUser(method,vlaidUsername)
    if(user) throw new UnauthorizedException(AuthMassege.ConfiltExistAcont)
    if(method == AuthMethod.username) throw new BadRequestException(BadRequestExceptionMasseage.InValidRegisterData)  
      user= this.userRepository.create({
        [method]:username
    })
    user =await this.userRepository.save(user)
        user.username=`US_${user.id}`
       await this.userRepository.save(user) 
       const token= this.tokenServiec.craeteToken({userId:user.id})
    const otp= await this.saveOtp(user.id)
    return{
      message:AuthMassege.secessExsitCode,
        code:otp.code,
        token
    }

  }

  async sendRespons(res:Response,result:AuthRespons){
    const {code,token}=result
    const expiresIn=new Date(Date.now()+(1000*60*2))
    res.cookie(CookieKeys.Ojc_rec,token,{httpOnly:true,expires:expiresIn})
    res.json({
      message:AuthMassege.secessExsitCode,
      code,
    })
  }

  chekOtp(code:string){
    const token=this.req.cookies?.[CookieKeys.Ojc_rec];
    if(!token) throw new BadRequestException(AuthMassege.ExperidCode)
      return{
        token
      }
  }

  async saveOtp(userId:number){
    const code=randomInt(10000,99999).toString()
    const expiresIn=new Date(Date.now()+(1000*60*2))
    let otp=await this.otpRepository.findOneBy({userId})
    let expierCode:boolean=false
    if(otp){
      if(otp.expiresIn > new Date()) throw new BadRequestException(BadRequestExceptionMasseage.InValidExpierCode)
      expierCode=true
      otp.code=code;
      otp.expiresIn=expiresIn
    }else{
      otp= this.otpRepository.create({code,expiresIn,userId})
    }
    otp = await this.otpRepository.save(otp)
    if(!expierCode){
       await this.userRepository.update({id:userId},{
        otpId:otp.id
       })
    }
    return otp;

  }
  usernameValidat(method:AuthMethod,username:string){
    switch (method) {
      case AuthMethod.email: 
        if(isEmail(username)) return username
        throw new BadRequestException("email format is incarect")
      case AuthMethod.phone: 
        if(isMobilePhone(username,'fa-IR')) return username
        throw new BadRequestException("phone number incarect")
      case AuthMethod.username:
        return username
      default:
        throw new UnauthorizedException("username not valid")
    }
  }
  async chekExistUser(method:AuthMethod,username:string){
    let user:UserEntity
    if(method === AuthMethod.email){
     user= await this.userRepository.findOneBy({email:username})
    } else if(method === AuthMethod.phone){
      user = await this.userRepository.findOneBy({phone:username})
    } else if( method === AuthMethod.username){
      user= await this.userRepository.findOneBy({username})
    }
    else{
      throw new BadRequestException(BadRequestExceptionMasseage.InValidLoginData)
    }
    return user
  }
}
