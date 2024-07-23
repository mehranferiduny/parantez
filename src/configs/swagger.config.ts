import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


export function swagerConfigInit(app:INestApplication):void{
  const document=new DocumentBuilder()
  .setTitle("Parantez")
  .setDescription("backend of parantez")
  .setVersion("0.0.1")
  .build()
  const swaggerDocument=SwaggerModule.createDocument(app,document)
  SwaggerModule.setup('/swagger',app,swaggerDocument)
}