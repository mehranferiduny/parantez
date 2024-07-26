import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, ChekOtpDto } from './dto/auth.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { Response } from 'express';


@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user-existence')
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  userExistence(@Body() authDto:AuthDto ,@Res() res:Response){
    return this.authService.userExistence(authDto,res)
   
  }
  @Post('chekOtp')
  @ApiConsumes(SwaggerConsumes.UrlEncoded,SwaggerConsumes.Json)
  checkOtp(@Body() checkDto:ChekOtpDto){
    return this.authService.chekOtp(checkDto.code)
   
  }

}
