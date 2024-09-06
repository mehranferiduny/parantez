import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException, Scope, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entites/user.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entites/profile.entity';
import { ProfileDto, UserBlockDto } from './dto/profile.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { isDate, IsDate, isEnum } from 'class-validator';
import { Gender } from './enum/gender.enum';
import { ImageProfile } from './types/files';
import { AuthMassege, BadRequestExceptionMasseage, ConflictExceptionMassage, NotFindMassege, PublicMassege } from 'src/common/enums/message.enum';
import { AuthService } from '../auth/auth.service';
import { TokenServiec } from '../auth/token.service';
import { AuthMethod } from '../auth/enums/method.enum';
import { CookieKeys } from 'src/common/enums/cookie.enum';
import { OtpEntity } from './entites/otp.entity';
import { FollowerEntity } from './entites/follower.entity';
import { EntityName } from 'src/common/enums/entity.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { PagitionGeneritor, PagitionSolver } from 'src/common/utils/pagintion.util';
import { UserStatus } from './enum/status.enum';

@Injectable({scope:Scope.REQUEST})
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepositoty:Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private readonly profileRepositoty:Repository<ProfileEntity>,
    @InjectRepository(OtpEntity) private readonly otpRepository:Repository<OtpEntity>,
    @InjectRepository(FollowerEntity) private readonly followRepository:Repository<FollowerEntity>,
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

  async find(paginationDto:PaginationDto){
   const{limit,page,skip}=PagitionSolver(paginationDto)
    const[users,count]=await this.userRepositoty.findAndCount({
      where:{},
      skip,
      take:limit
    })

 return{
  pagination:PagitionGeneritor(page,limit,count),
  users
 }

  }


  async following(paginationDto:PaginationDto){
   const{limit,page,skip}=PagitionSolver(paginationDto)
   const {id:userId}=this.req.user
    const[following,count]=await this.followRepository.findAndCount({
      where:{followerId:userId},
      relations:{
        followeing:{
          profile:true
        }
      },
      select:{
        id:true,
        followeing:{
          id:true,
          username:true,
          profile:{
            nik_name:true,
            imag_profile:true,
            bio:true
          }

        }
      },
      skip,
      take:limit
    })

 return{
  pagination:PagitionGeneritor(page,limit,count),
  following
 }

  }
  async follower(paginationDto:PaginationDto){
   const{limit,page,skip}=PagitionSolver(paginationDto)
   const {id:userId}=this.req.user
    const[follower,count]=await this.followRepository.findAndCount({
      where:{followeingId:userId},
      relations:{
        follower:{
          profile:true
        }
      },
      select:{
        id:true,
        follower:{
          id:true,
          username:true,
          profile:{
            nik_name:true,
            imag_profile:true,
            bio:true
          }

        }
      },
      skip,
      take:limit
    })

 return{
  pagination:PagitionGeneritor(page,limit,count),
  follower
 }

  }


  profile(){
    const {id}=this.req.user
    return this.userRepositoty.createQueryBuilder(EntityName.User)
    .where({id})
    .leftJoinAndSelect("user.profile","profile")
    .loadRelationCountAndMap("user.follower","user.follower")
    .loadRelationCountAndMap("user.followeing","user.followeing")
    .getOne()
  }

  async chenagePhone(phone:string){
    const {id}=this.req.user
    const user=await this.userRepositoty.findOneBy({phone})
    if(user && user?.id !== id){
      throw new ConflictException(ConflictExceptionMassage.phone)
    }else if(user && user?.id === id){
      return {
        message:PublicMassege.Updaeted 
      }
    }
    await this.userRepositoty.update({id},{
      new_phone:phone
    })
    const otp=await this.authService.saveOtp(id,AuthMethod.phone)
    const token= this.tokenService.craetePhoneToken({phone})
    return{
      code:otp.code,
      token
    }
  }

  async verifyPhone(code:string){
    const {new_phone,id:userId}=this.req.user;
    const token=this.req.cookies?.[CookieKeys.Ojc_Phone];
    if(!token) throw new BadRequestException(AuthMassege.ExperidCode)
     const {phone}=this.tokenService.verifyPhoneToken(token)
    if(phone !== new_phone) throw new BadRequestException(BadRequestExceptionMasseage.BatTryAgen)
      const otp=await this.cheackOtp(userId,code)
    if(otp.mehtoad !== AuthMethod.phone){
      throw new BadRequestException(BadRequestExceptionMasseage.BatTryAgen)
    }
    await this.userRepositoty.update({id:userId},{
      phone,
      verify_phone:true,
      new_phone:null
    })
    return{
      message:PublicMassege.Updaeted
    }

   

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
      const otp=await this.cheackOtp(userId,code)
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
  async cheackOtp(userId:number,code:string){
    const otp=await this.otpRepository.findOneBy({userId})
    if(!otp) throw new UnauthorizedException(PublicMassege.TryAgin)
      if(otp.expiresIn < new Date()) throw new UnauthorizedException(AuthMassege.ExperidCode)
        if(otp.code !== code) throw new UnauthorizedException(PublicMassege.TryAgin)
    return otp;      
  }

  async chenagUsername(username:string){
    const {id}=this.req.user
    const user=await this.userRepositoty.findOneBy({username})
    if(user && user?.id !== id){
      throw new ConflictException(ConflictExceptionMassage.username)
    }else if(user && user?.id === id){
      return {
        message:PublicMassege.Updaeted 
      }
    }
    await this.userRepositoty.update({id},{
      username
    })
    return {
      message:PublicMassege.Updaeted 
    }
  }

  async followTigel(followigId:number){
    const {id:userId}=this.req.user
    const follow=await this.userRepositoty.findOneBy({id:followigId})
    if(!follow) throw new NotFoundException(NotFindMassege.NotUser)
      if(followigId === userId ) throw new BadRequestException(BadRequestExceptionMasseage.BatTryAgen)
      const isFollow=await this.followRepository.findOneBy({followeingId:followigId,followerId:userId})
    let message=PublicMassege.Follow
    if(isFollow){
   
         await this.followRepository.remove(isFollow)
         message=PublicMassege.Unfollow
    }else{
         await this.followRepository.insert({
          followeingId:followigId,
          followerId:userId
         })
    }
    return{
      message
    }
  }
  async blockTigel(blockDto:UserBlockDto){
    const {userId}=blockDto
    const user=await this.userRepositoty.findOneBy({id:userId})
    if(!user) throw new NotFoundException(NotFindMassege.NotUser)
      
    const isBlock=await this.userRepositoty.findOneBy({status:UserStatus.Block})
    let message=PublicMassege.Block
    if(isBlock){
         await this.userRepositoty.update({id:userId},{status:UserStatus.Active})
         message=PublicMassege.Unblock
    }else{
         await this.userRepositoty.update({
          id:userId
         },{
          status:UserStatus.Block
         })
    }
    return{
      message
    }
  }
}
