import { Controller, Get, Post, Put, Delete, Body, Req, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger'
import { Roles } from '../middlewares/meta.role'
import { JwtAuthGuard } from '../middlewares/guard.jwt'
import { RolesGuard } from '../middlewares/guard.role'
import { UserRole } from '../enums/user-role.enum'
import { ProductEditObject, ProductQueryObject, ProductListObject } from '../data-objects/product.object'
import { ProductService } from './product.service'

@Controller()
export class ProductController {
	constructor(private productService: ProductService) {}

	@Get('products')
	@ApiQuery({ type: ProductListObject })
	async getProducts(@Req() req: any) {
		const queries = req.query || {}
		return await this.productService.findAll(queries)
	}

	@Get('product/:id')
	async getProductId(@Param() params: ProductQueryObject) {
		const id = params.id || null
		return await this.productService.findOne(id)
	}

	@Post('product')
	@Roles(UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth('JWT-auth')
	async addProduct(@Body() data: ProductEditObject) {
		return await this.productService.create(data)
	}

	@Put('product/:id')
	@Roles(UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth('JWT-auth')
	async editProduct(@Param() params: ProductQueryObject, @Body() data: ProductEditObject) {
		const id = params.id || null
		return await this.productService.update(id, data)
	}

	@Delete('product/:id')
	@Roles(UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth('JWT-auth')
	async removeProduct(@Param() params: ProductQueryObject) {
		const id = params.id || null
		return await this.productService.delete(id)
	}
}
