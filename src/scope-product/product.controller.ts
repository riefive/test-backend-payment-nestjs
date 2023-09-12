import { Controller, Get, Post, Body, Req, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { JwtAuthGuard } from '../middlewares/guard.jwt'
import { ProductQueryObject } from '../data-objects/product.object'
import { ProductService } from './product.service'

@Controller()
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get('products')
	async getProducts(@Req() req: any) {
		const queries = req.query || {}
		return await this.productService.findAll(queries)
	}

	@Get('product/:id')
	async getProductId(@Param() params: ProductQueryObject) {
		const id = params.id || null
		return await this.productService.findOne(id)
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth('JWT-auth')
	@Post('product')
	async addProduct(@Body() data: any) {
		return await this.productService.create(data)
	}
}
