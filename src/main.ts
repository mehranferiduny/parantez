import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { swagerConfigInit } from './configs/swagger.config';
import * as cookieParser from 'cookie-parser'
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets("public")
  app.use(cookieParser(process.env.COOKIE_SECRET))
  swagerConfigInit(app)
  const{PORT}=process.env
  await app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
    console.log(`swagger: http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
