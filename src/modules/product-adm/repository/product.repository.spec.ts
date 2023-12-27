import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from './product.model'
import Id from '../../@shared/domain/value-object/id.value-object'
import Product from '../domain/product.entity'
import ProductRepository from './product.repository'

describe('product repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productProps = {
      id: new Id('1'),
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10
    }
    const product = new Product(productProps)
    const productRepository = new ProductRepository()
    await productRepository.add(product)

    const productDb = await ProductModel.findOne({
      where: { id: productProps.id.id }
    })

    expect(productDb.id).toEqual(productProps.id.id)
    expect(productDb.name).toEqual(productProps.name)
    expect(productDb.description).toEqual(productProps.description)
    expect(productDb.purchasePrice).toEqual(productProps.purchasePrice)
    expect(productDb.stock).toEqual(productProps.stock)
  })

  it('should find a product', async () => {
    const productRepository = new ProductRepository()

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    ProductModel.create(input)

    const product = await productRepository.find('1')

    expect(product.id.id).toEqual(input.id)
    expect(product.name).toEqual(input.name)
    expect(product.description).toEqual(input.description)
    expect(product.purchasePrice).toEqual(input.purchasePrice)
    expect(product.stock).toEqual(input.stock)
  })
})
