import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for client', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const response = await request(app)
      .post('/client')
      .send({
        id: '1',
        name: 'Client 1',
        email: 'client@example.com',
        document: '00000000000',
        address: {
          street: 'Client street',
          number: '1',
          complement: 'Client complement',
          city: 'Client city',
          state: 'Client state',
          zipCode: '00000000'
        }
      })

    expect(response.status).toBe(200)
  })
  it('should not create a customer', async () => {
    const response = await request(app).post('/client').send({
      name: 'John'
    })

    expect(response.status).toBe(500)
  })
})
