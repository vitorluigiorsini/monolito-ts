import { Sequelize } from 'sequelize-typescript'
import CatalogProductModel from './product.model'
import CatalogProductRepository from './product.repository'
import Product from '../domain/product.entity'
import Id from '../../@shared/domain/value-object/id.value-object'

describe('catalog product repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([CatalogProductModel])
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
      salesPrice: 100
    }
    const product = new Product(productProps)

    const catalogRepository = new CatalogProductRepository()
    await catalogRepository.add(product)

    const productDb = await CatalogProductModel.findOne({
      where: { id: productProps.id.id }
    })

    expect(productDb.id).toEqual(productProps.id.id)
    expect(productDb.name).toEqual(productProps.name)
    expect(productDb.description).toEqual(productProps.description)
    expect(productDb.salesPrice).toEqual(productProps.salesPrice)
  })

  it('should find all products', async () => {
    await CatalogProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100
    })

    await CatalogProductModel.create({
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      salesPrice: 200
    })

    const productRepository = new CatalogProductRepository()
    const products = await productRepository.findAll()

    expect(products.length).toBe(2)
    expect(products[0].id.id).toBe('1')
    expect(products[0].name).toBe('Product 1')
    expect(products[0].description).toBe('Description 1')
    expect(products[0].salesPrice).toBe(100)
    expect(products[1].id.id).toBe('2')
    expect(products[1].name).toBe('Product 2')
    expect(products[1].description).toBe('Description 2')
    expect(products[1].salesPrice).toBe(200)
  })

  it('should find a product', async () => {
    await CatalogProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100
    })

    const productRepository = new CatalogProductRepository()
    const product = await productRepository.find('1')

    expect(product.id.id).toBe('1')
    expect(product.name).toBe('Product 1')
    expect(product.description).toBe('Description 1')
    expect(product.salesPrice).toBe(100)
  })
})
