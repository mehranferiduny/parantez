import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";


@Controller('/auth/google')
@ApiTags("Google Auth")
@UseGuards(AuthGuard('google'))
export class GoogleControler{
  constructor(private readonly authServis:AuthService){}
  @Get()
  googleLogin(@Req() req){}

  @Get("/redirect")
  googleRedirect(@Req() req){
    const userData= req.user
    return this.authServis.userLoginOAuth(userData)
  }

}