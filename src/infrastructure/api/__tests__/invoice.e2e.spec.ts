import InvoiceItemsModel from '../../../modules/invoice/repository/invoice-items.model'
import InvoiceModel from '../../../modules/invoice/repository/invoice.model'
import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should find an invoice', async () => {
    await InvoiceModel.create(
      {
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
        items: [
          {
            id: '1',
            name: 'Item 1',
            price: 10,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            id: '2',
            name: 'Item 2',
            price: 20,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        include: [{ model: InvoiceItemsModel }]
      }
    )

    const response = await request(app).get('/invoice/1')

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Client 1')
    expect(response.body.address.street).toBe('Client street')
    expect(response.body.address.number).toBe('1')
    expect(response.body.address.city).toBe('Client city')
    expect(response.body.address.zipCode).toBe('00000000')
    expect(response.body.items[0].name).toBe('Item 1')
    expect(response.body.items[0].price).toBe(10)
    expect(response.body.items[1].name).toBe('Item 2')
    expect(response.body.items[1].price).toBe(20)
  })
  it('should not find an customer', async () => {
    const response = await request(app).get('/invoice/1')

    expect(response.status).toBe(500)
  })
})
