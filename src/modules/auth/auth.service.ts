import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthType } from './enums/type.enum';
import { AuthMethod } from './enums/method.enum';
import { isEmail, isMobilePhone } from 'class-validator';

@Injectable()
export class AuthService {

  userExistence(authDto:AuthDto){
    const {method,type,username}=authDto
    switch (type) {
      case AuthType.login: return this.login(method,username)
      case AuthType.register: return this.register(method,username)
      default:
        throw new UnauthorizedException()
    }


  }

  login(method:AuthMethod,username:String){
   
      return this.usernameValidat(method,username)
  }
  register(method:AuthMethod,username:String){
    return this.usernameValidat(method,username)
  }
  usernameValidat(method:AuthMethod,username:String){
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
}
