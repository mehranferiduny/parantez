import { Body, Controller, Get, Param, ParseFilePipe, ParseIntPipe, Patch, Post, Query, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { ChenageEmailDto, ChenagePhoneDto, ChenageUsernameDto, ProfileDto, UserBlockDto } from './dto/profile.dto';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { malterStoreg } from 'src/common/utils/multer.util';
import {  UploadedOptionFile } from 'src/common/decorators/uploadfile.decorator';
import { ImageProfile } from './types/files';
import { Response } from 'express';
import { CookieKeys } from 'src/common/enums/cookie.enum';
import { CookieOptionToken } from 'src/common/utils/cookie.util';
import { AuthMassege, PublicMassege } from 'src/common/enums/message.enum';
import { ChekOtpDto } from '../auth/dto/auth.dto';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';
import { Pagination } from 'src/common/decorators/paginashen.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CanAcssec } from 'src/common/decorators/roles.decorator';
import { Roles } from 'src/common/enums/roul.enum';

@Controller('user')
@AuthDecorator("User")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch("profile")
  @ApiConsumes(SwaggerConsumes.MultipartData)
  @UseInterceptors(FileFieldsInterceptor([
    {name:"imag_profile",maxCount:1},
    {name:"bg_Image",maxCount:1}
  ],
  {
    storage:malterStoreg("profile-image")
  }
))
  changProfile(
    @UploadedOptionFile()
     file:ImageProfile,
    @Body() profileDto:ProfileDto){
    return this.userService.changProfile(profileDto,file)
  }
  @Get('profile')
  profile(){
    return this.userService.profile()
  }
  @Get('list')
  @Pagination()
  userListFind(@Query() paginationDto:PaginationDto ){
    return this.userService.find(paginationDto)
  }
  @Get('follower')
  @Pagination()
  follower(@Query() paginationDto:PaginationDto ){
    return this.userService.follower(paginationDto)
  }
  @Get('following')
  @Pagination()
  following(@Query() paginationDto:PaginationDto ){
    return this.userService.following(paginationDto)
  }

  @Patch("cheng-phone")
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  async chenagePhone(@Body() chenagePhoneDto:ChenagePhoneDto,@Res() res:Response){
    const {code,message,token}=await this.userService.chenagePhone(chenagePhoneDto.Phone)
    if(message) return res.json({message})
      res.cookie(CookieKeys.Ojc_Phone,token,CookieOptionToken())
    res.json({
      message:AuthMassege.secessExsitCode,
      code
    })
  }

  @Post('verify-phone')
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  verifayPhone(@Body() otpPhone:ChekOtpDto){
    return this.userService.verifyPhone(otpPhone.code)
  }
  @Patch("cheng-email")
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  async chenageEmail(@Body() chenageEmailDto:ChenageEmailDto,@Res() res:Response){
    const {code,message,token}=await this.userService.chenageEmail(chenageEmailDto.email)
    if(message) return res.json({message})
      res.cookie(CookieKeys.Ojc_Email,token,CookieOptionToken())
    res.json({
      message:AuthMassege.secessExsitCode,
      code
    })
  }

  @Post('verify-email')
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  verifayEmail(@Body() otpEmail:ChekOtpDto){
    return this.userService.verifyEmail(otpEmail.code)
  }
  @Post('block-unbloc')
  @CanAcssec(Roles.Admin)
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  blockToggel(@Body() blockDto:UserBlockDto){
    return this.userService.blockTigel(blockDto)
  }
  @Patch('cheng-username')
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  chengUsername(@Body() otpUsername:ChenageUsernameDto){
    return this.userService.chenagUsername(otpUsername.username)
  }

  @Get("follow/:followingId")
  @ApiParam({name:"followingId"})
  follow(@Param("followingId",ParseIntPipe) followingId:number){
    return this.userService.followTigel(followingId)
  }
}
