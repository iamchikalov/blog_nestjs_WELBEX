import { NestFactory } from '@nestjs/core'

require('dotenv-flow').config({
  path: 'src/config/env'
})

import { AppModule } from './boot/app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const options = new DocumentBuilder().build()

  app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      transformOptions: { enableImplicitConversion: true }
  }))

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)

  const config = app.get(ConfigService)
  app.enableCors()

  await app.listen(config.get<number>('PORT') | 3000)
  console.log(`Application listening: http://${config.get<number>('HOST')}:${config.get<string>('PORT')}`)
}
bootstrap()
