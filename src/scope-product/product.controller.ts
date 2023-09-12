import { Controller, Get, Post, Put, Delete, Body, Req, Param, UseGuards } from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { Roles } from '../middlewares/meta.role'
import { JwtAuthGuard } from '../middlewares/guard.jwt'
import { RolesGuard } from '../middlewares/guard.role'
import { UserRole } from '../enums/user-role.enum'
import { ProductEditObject, ProductQueryObject } from '../data-objects/product.object'
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

	@Roles(UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth('JWT-auth')
	@Post('product')
	async addProduct(@Body() data: any) {
		return await this.productService.create(data)
	}

	@Roles(UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth('JWT-auth')
	@Put('product/:id')
	async editProduct(@Param() params: ProductQueryObject, @Body() data: ProductEditObject) {
		const id = params.id || null
		return await this.productService.update(id, data)
	}

	@Roles(UserRole.ADMIN)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@ApiBearerAuth('JWT-auth')
	@Delete('product/:id')
	async removeProduct(@Param() params: ProductQueryObject) {
		const id = params.id || null
		return await this.productService.delete(id)
	}
}
