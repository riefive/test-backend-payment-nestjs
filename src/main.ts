import { NestFactory } from '@nestjs/core'
import { Logger, BadRequestException, ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)

	// swagger
	const config = new DocumentBuilder()
		.setTitle('Mini Payment')
		.setDescription('The Mini Payment API description')
		.setVersion('1.0')
		.addTag('minipayment')
		.addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'JWT', description: 'Enter JWT token', in: 'header' }, 'JWT-auth')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('open-api', app, document, {
		swaggerOptions: {
			persistAuthorization: true
		}
	})

	const whitelist = ['http://localhost:3000']
	app.enableCors({
		origin: function (origin, callback) {
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true)
			} else {
				callback(new Error('Not allowed by CORS'))
			}
		},
		allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
		methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
		credentials: true
	})
	app.disable('x-powered-by', 'X-Powered-By')
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
