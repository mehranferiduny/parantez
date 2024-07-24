import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { swagerConfigInit } from './configs/swagger.config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swagerConfigInit(app)
  const{PORT}=process.env
  await app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
    console.log(`swagger: http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
