import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { typeOrmConfig } from 'src/configs/typeorm.config';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { LoggerMiddleware } from 'src/common/logger/logger';
import { BlogModule } from '../blog/blog.module';
import { ImagesModule } from '../images/images.module';



@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal:true,
    envFilePath:join(process.cwd(),'.env')
  }),
    TypeOrmModule.forRoot(typeOrmConfig()),
    AuthModule,
    UserModule,
    CategoryModule,
    BlogModule,
    ImagesModule
  ],
    
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*")
  }
}
