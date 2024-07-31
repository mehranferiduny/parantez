import { Body, Controller, Get, ParseFilePipe, Patch, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ChenageEmailDto, ProfileDto } from './dto/profile.dto';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { malterStoreg } from 'src/common/utils/multer.util';
import { AuthGuard } from '../auth/guards/auth.guard';
import {  UploadedOptionFile } from 'src/common/decorators/uploadfile.decorator';
import { ImageProfile } from './types/files';
import { Response } from 'express';
import { CookieKeys } from 'src/common/enums/cookie.enum';
import { CookieOptionToken } from 'src/common/utils/cookie.util';
import { AuthMassege, PublicMassege } from 'src/common/enums/message.enum';

@Controller('user')
@ApiTags("User")
@ApiBearerAuth('Authuriztion')
@UseGuards(AuthGuard)
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

  @Patch("cheng-email")
  async chenageEmail(@Body() chenageEmailDto:ChenageEmailDto,@Res() res:Response){
    const {code,message,token}=await this.userService.chenageEmail(chenageEmailDto.email)
    if(message) return res.json({message})
      res.cookie(CookieKeys.Ojc_Email,token,CookieOptionToken())
    res.json({
      message:AuthMassege.secessExsitCode,
      code
    })
  }
}
