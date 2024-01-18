import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../repository/product.model'
import ProductAdmFacadeFactory from '../factory/facade.factory'

describe('ProductAdmFacade test', () => {
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
    const productFacade = ProductAdmFacadeFactory.create()

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10
    }

    await productFacade.addProduct(input)

    const productDb = await ProductModel.findOne({
      where: { id: '1' }
    })

    expect(productDb).toBeDefined()
    expect(productDb.id).toEqual(input.id)
    expect(productDb.name).toEqual(input.name)
    expect(productDb.description).toEqual(input.description)
    expect(productDb.purchasePrice).toEqual(input.purchasePrice)
    expect(productDb.stock).toEqual(input.stock)
  })

  it('should check product stock', async () => {
    const productFacade = ProductAdmFacadeFactory.create()
    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10
    }
    await productFacade.addProduct(input)

    const result = await productFacade.checkStock({ productId: '1' })

    expect(result.productId).toBe(input.id)
    expect(result.stock).toBe(input.stock)
  })
})
