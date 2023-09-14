import { setSeederFactory } from 'typeorm-extension'
import { faker } from '@faker-js/faker'
import { Product } from '../../entities/product.entity'

export default setSeederFactory(Product, () => {
	const product = new Product()
	product.name = faker.commerce.productName()
	product.description = faker.commerce.productDescription()
	product.sku = faker.number.hex({ min: 0, max: 65535 })
	product.price = Number(faker.commerce.price({ min: 10e3, max: 10e5 }) || 0)
	product.image = faker.image.urlLoremFlickr({ category: 'abstract' })
	return product
})
