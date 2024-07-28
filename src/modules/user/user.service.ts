import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entites/user.entity';
import { Repository } from 'typeorm';
import { ProfileEntity } from './entites/profile.entity';
import { ProfileDto } from './dto/profile.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { isDate, IsDate, isEnum } from 'class-validator';
import { Gender } from './enum/gender.enum';

@Injectable({scope:Scope.REQUEST})
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepositoty:Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private readonly profileRepositoty:Repository<ProfileEntity>,
    @Inject(REQUEST) private readonly req:Request
  ){}

  async chanfProfile(profileDto:ProfileDto){
    const {id:userId,profileId}=this.req.user;
    const profile=await this.profileRepositoty.findOneBy({userId})
    const {bio,birthday,gander,linkdin_profile,x_profile,nik_name}=profileDto
    if(profile){
      if(bio) profile.bio=bio;
      if(birthday && isDate(new Date(birthday))) profile.birthday=new Date(birthday);
      if(gander && Object.values(Gender as any).includes(gander)) profile.gander=gander;
      if(nik_name) profile.nik_name=nik_name;
      if(linkdin_profile) profile.linkdin_profile=linkdin_profile;
      if(x_profile) profile.x_profile=x_profile;

    }else{
         this.profileRepositoty.create({
          bio,
          birthday,
          gander,
          linkdin_profile,
          x_profile,
          nik_name,
          userId
        })
    }
    await this.profileRepositoty.save(profile)
    if(!profileId){
          await this.userRepositoty.update({id:userId},{
            profileId:profile.id
          })
    }
  }
}
