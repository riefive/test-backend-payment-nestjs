import { define } from 'typeorm-seeding'
import { faker } from '@faker-js/faker'
import { Product } from '../../entities/product.entity'

define(Product, () => {
	const product = new Product()
	product.name = faker.commerce.productName()
	product.description = faker.commerce.productDescription()
	product.sku = faker.number.hex({ min: 0, max: 65535 })
	product.price = Number(faker.commerce.price({ min: 10e4, max: 10e7 }) || 0)
	product.image = faker.image.urlLoremFlickr({ category: 'abstract' })
	return product
})
