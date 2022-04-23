import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
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
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(5000)
}
bootstrap()
