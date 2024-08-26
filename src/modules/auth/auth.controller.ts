import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, ChekOtpDto } from './dto/auth.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth.guard';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';
import { CanAcssec } from 'src/common/decorators/roles.decorator';
import { Roles } from 'src/common/enums/roul.enum';


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

  @Get('check-Login')
  @AuthDecorator("Auth")
  @CanAcssec(Roles.Admin)
  cheackLogin(@Req() req:Request){
    return req.user
  }

}
