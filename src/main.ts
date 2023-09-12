import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder()
		.setTitle('Mini Payment')
		.setDescription('The Mini Payment API description')
		.setVersion('1.0')
		.addTag('minipayment')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document)

	await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000)
	Logger.log(`Application running at ${await app.getUrl()}`)
}
bootstrap()
