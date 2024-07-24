import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthType } from './enums/type.enum';
import { AuthMethod } from './enums/method.enum';
import { isEmail, isMobilePhone } from 'class-validator';
import { UserEntity } from '../user/entites/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from '../user/entites/profile.entity';
import { AuthMassege, BadRequestExceptionMasseage } from 'src/common/enums/message.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private readonly profileRepository:Repository<ProfileEntity>
  ){}

  userExistence(authDto:AuthDto){
    const {method,type,username}=authDto
    switch (type) {
      case AuthType.login: return this.login(method,username)
      case AuthType.register: return this.register(method,username)
      default:
        throw new UnauthorizedException()
    }


  }

 async login(method:AuthMethod,username:string){
    const vlaidUsername= this.usernameValidat(method,username)
    let user:UserEntity=await this.chekExistUser(method,vlaidUsername)
    if(!user) throw new UnauthorizedException(AuthMassege.AcontNotFind)

     
  }
  async register(method:AuthMethod,username:string){
    const vlaidUsername= this.usernameValidat(method,username)
    let user:UserEntity=await this.chekExistUser(method,vlaidUsername)
    if(user) throw new UnauthorizedException(AuthMassege.ConfiltExistAcont)
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
