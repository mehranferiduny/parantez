import { Body, Controller, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';

@Controller('user')
@ApiTags("User")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch("profile")
  @ApiConsumes(SwaggerConsumes.MultipartData)
  changProfile(@Body() profileDto:ProfileDto){
    return this.userService
  }
}
