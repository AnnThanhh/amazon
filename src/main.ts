import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from "express"
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './response.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(express.static("."))
  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder().setTitle("Amazon").addBearerAuth().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/swagger", app, document)
  await app.listen(8080);
}
bootstrap();
