import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import { readFileSync } from 'fs'
import Helmet from 'helmet'
import { resolve } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true })

    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
        prefix: 'api/v',
    })

    const config = new DocumentBuilder()
        .setTitle('Armapay API')
        .setDescription('The Armapay API description')
        .setVersion('1.0')
        .addTag('common')
        .build()
    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('api', app, document, {
        customCss: readFileSync(resolve(__dirname, `../public/swagger/css/theme-flattop.css`), 'utf-8'),
    })

    app.use(Helmet())
    app.use(cookieParser())
    app.use(compression())
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    await app.listen(5000)
}
bootstrap()
