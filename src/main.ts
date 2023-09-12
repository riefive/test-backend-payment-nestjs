import { NestFactory } from '@nestjs/core'
import { Logger, BadRequestException, ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder()
		.setTitle('Mini Payment')
		.setDescription('The Mini Payment API description')
		.setVersion('1.0')
		.addTag('minipayment')
		.addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'JWT', description: 'Enter JWT token', in: 'header' }, 'JWT-auth')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api', app, document, {
		swaggerOptions: {
			persistAuthorization: true
		}
	})

	app.useGlobalPipes(
		new ValidationPipe({
			disableErrorMessages: false,
			stopAtFirstError: true,
			exceptionFactory: (errors) => {
				const result = errors.map((error) => ({
					property: error.property,
					message: error.constraints[Object.keys(error.constraints)[0]]
				}))
				return new BadRequestException(result)
			}
		})
	)
	await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000)
	Logger.log(`Application running at ${await app.getUrl()}`)
}
bootstrap()
