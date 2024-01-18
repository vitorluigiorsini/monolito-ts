import { app, sequelize } from '../express'
import request from 'supertest'
import ProductModel from '../../../modules/product-adm/repository/product.model'
import CatalogProductModel from '../../../modules/store-catalog/repository/product.model'
import ClientModel from '../../../modules/client-adm/repository/client.model'

describe('E2E test for checkout', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should place an order', async () => {
    await ClientModel.create({
      id: '1',
      name: 'Client 1',
      email: 'client@example.com',
      document: '00000000000',
      street: 'Client street',
      number: '1',
      complement: 'Client complement',
      city: 'Client city',
      state: 'Client state',
      zipCode: '00000000',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await ProductModel.create({
      id: '2',
      name: 'Product 2',
      description: 'Product 2 description',
      purchasePrice: 200,
      stock: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await CatalogProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 120
    })

    await CatalogProductModel.create({
      id: '2',
      name: 'Product 2',
      description: 'Product 2 description',
      salesPrice: 220
    })

    const response = await request(app)
      .post('/checkout')
      .send({
        clientId: '1',
        products: [
          {
            productId: '1'
          },
          {
            productId: '2'
          }
        ]
      })

    expect(response.status).toBe(200)
    expect(response.body.total).toBe(340)
    expect(response.body.products[0].productId).toBe('1')
    expect(response.body.products[1].productId).toBe('2')
  })
  it('should not place an order', async () => {
    const response = await request(app).post('/checkout').send({
      clientId: '1'
    })

    expect(response.status).toBe(500)
  })
})
