import { BadRequestException, ConflictException, Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entites/user.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entites/profile.entity';
import { ProfileDto } from './dto/profile.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { isDate, IsDate, isEnum } from 'class-validator';
import { Gender } from './enum/gender.enum';
import { ImageProfile } from './types/files';
import { AuthMassege, BadRequestExceptionMasseage, ConflictExceptionMassage, PublicMassege } from 'src/common/enums/message.enum';
import { AuthService } from '../auth/auth.service';
import { TokenServiec } from '../auth/token.service';
import { AuthMethod } from '../auth/enums/method.enum';
import { CookieKeys } from 'src/common/enums/cookie.enum';
import { OtpEntity } from './entites/otp.entity';

@Injectable({scope:Scope.REQUEST})
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepositoty:Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private readonly profileRepositoty:Repository<ProfileEntity>,
    @InjectRepository(OtpEntity) private readonly otpRepository:Repository<OtpEntity>,
    @Inject(REQUEST) private readonly req:Request,
    private readonly authService:AuthService,
    private readonly tokenService:TokenServiec
  ){}

  async changProfile(profileDto:ProfileDto,file:ImageProfile){
    if(file?.bg_Image?.length >0){
      let[image]=file?.bg_Image
      profileDto.bg_Image=image?.path?.slice(7)
    }
    if(file?.imag_profile?.length >0){
      let[image]=file?.imag_profile
      profileDto.imag_profile=image?.path?.slice(7)
    }

    const {id:userId,profileId}=this.req.user;
    let profile=await this.profileRepositoty.findOneBy({userId})
    const {bio,birthday,gander,linkdin_profile
      ,x_profile,nik_name,bg_Image,imag_profile}=profileDto
    console.log(profileDto)
    if(profile){
      if(bio) profile.bio=bio;
      if(birthday && isDate(new Date(birthday))) profile.birthday=new Date(birthday);
      if(gander && Object.values(Gender as any).includes(gander)) profile.gander=gander;
      if(nik_name) profile.nik_name=nik_name;
      if(linkdin_profile) profile.linkdin_profile=linkdin_profile;
      if(x_profile) profile.x_profile=x_profile;
      if(imag_profile) profile.imag_profile=imag_profile;
      if(bg_Image) profile.bg_Image=bg_Image;

    }else{
       profile=  this.profileRepositoty.create({
          bio,
          birthday,
          gander,
          linkdin_profile,
          x_profile,
          nik_name,
          userId,
          bg_Image,
          imag_profile
        })
    }
    await this.profileRepositoty.save(profile)
    if(!profileId){
          await this.userRepositoty.update({id:userId},{
            profileId:profile.id
          })
    }
    return {
      message:PublicMassege.Updaeted
    }
  }

  profile(){
    const {id}=this.req.user
    return this.userRepositoty.findOne({
      where:{id},
      relations:['profile']
    })
  }

  async chenageEmail(email:string){
    const {id}=this.req.user
    const user=await this.userRepositoty.findOneBy({email})
    if(user && user?.id !== id){
      throw new ConflictException(ConflictExceptionMassage.email)
    }else if(user && user?.id === id){
      return {
        message:PublicMassege.Updaeted 
      }
    }
    await this.userRepositoty.update({id},{
      new_email:email
    })
    const otp=await this.authService.saveOtp(id,AuthMethod.email)
    const token= this.tokenService.craeteEmailToken({email})
    return{
      code:otp.code,
      token
    }
  }

  async verifyEmail(code:string){
    const {new_email,id:userId}=this.req.user;
    const token=this.req.cookies?.[CookieKeys.Ojc_Email];
    if(!token) throw new BadRequestException(AuthMassege.ExperidCode)
     const {email}=this.tokenService.verifyEmailToken(token)
    if(email !== new_email) throw new BadRequestException(BadRequestExceptionMasseage.BatTryAgen)
      const otp=await this.cheackEmailOtp(userId,code)
    if(otp.mehtoad !== AuthMethod.email){
      throw new BadRequestException(BadRequestExceptionMasseage.BatTryAgen)
    }
    await this.userRepositoty.update({id:userId},{
      email,
      verify_email:true,
      new_email:null
    })
    return{
      message:PublicMassege.Updaeted
    }

   

  }
  async cheackEmailOtp(userId:number,code:string){
    const otp=await this.otpRepository.findOneBy({userId})
    if(!otp) throw new UnauthorizedException(PublicMassege.TryAgin)
      if(otp.expiresIn < new Date()) throw new UnauthorizedException(AuthMassege.ExperidCode)
        if(otp.code !== code) throw new UnauthorizedException(PublicMassege.TryAgin)
    return otp;      
  }
}
