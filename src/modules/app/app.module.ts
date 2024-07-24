import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { typeOrmConfig } from 'src/configs/typeorm.config';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:join(process.cwd(),'.env')
  }),
    TypeOrmModule.forRoot(typeOrmConfig()),
    AuthModule,
    UserModule
  ],
    
  controllers: [],
  providers: [],
})
export class AppModule {}
