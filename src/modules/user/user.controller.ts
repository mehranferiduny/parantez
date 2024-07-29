import { Body, Controller, ParseFilePipe, Patch, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProfileDto } from './dto/profile.dto';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { malterDestition, malterFileName } from 'src/common/utils/multer.util';
import { AuthGuard } from '../auth/guards/auth.guard';

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
    storage:diskStorage({
      destination:malterDestition("profile-image"),
      filename:malterFileName
    })
  }
))
  changProfile(
    @UploadedFiles(new ParseFilePipe({
      fileIsRequired:false,
      validators:[]
    })) file:any,
    @Body() profileDto:ProfileDto){
    return this.userService.chanfProfile(profileDto,file)
  }
}
