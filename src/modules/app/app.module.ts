import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';



@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:join(process.cwd(),'.env')
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
