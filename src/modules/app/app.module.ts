import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { typeOrmConfig } from 'src/configs/typeorm.config';
import { UserModule } from '../user/user.module';



@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:join(process.cwd(),'.env')
  }),
    TypeOrmModule.forRoot(typeOrmConfig()),
    UserModule],
    
  controllers: [],
  providers: [],
})
export class AppModule {}
