import Id from '../../../modules/@shared/domain/value-object/id.value-object'
import ProductModel from '../../../modules/product-adm/repository/product.model'
import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for products', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const response = await request(app).post('/product').send({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Product 1')
    expect(response.body.purchasePrice).toBe(100)
  })
  it('should not create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product'
    })

    expect(response.status).toBe(500)
  })

  it('should add a product to the store catalog', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const response = await request(app).post('/product/catalog').send({
      id: '1',
      salesPrice: 100
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Product 1')
    expect(response.body.salesPrice).toBe(100)
  })
})
