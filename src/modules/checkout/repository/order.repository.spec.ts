import { Sequelize } from 'sequelize-typescript'
import Id from '../../@shared/domain/value-object/id.value-object'
import Address from '../../@shared/domain/value-object/address.value-object'
import OrderModel from './order.model'
import OrderProductModel from './order-product.model'
import OrderRepository from './order.repository'
import Product from '../domain/product.entity'
import Client from '../domain/client.entity'
import Order from '../domain/order.entity'
import OrderClientModel from './order-client.model'

describe('OrderRepository unit tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([OrderModel, OrderProductModel, OrderClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })
  it('should create a order', async () => {
    const repository = new OrderRepository()

    const product1 = new Product({
      id: new Id('123'),
      name: 'Product 1',
      description: 'Product 1',
      salesPrice: 10
    })

    const product2 = new Product({
      id: new Id('456'),
      name: 'Product 2',
      description: 'Product 2',
      salesPrice: 20
    })

    const client = new Client({
      id: new Id('1'),
      name: 'Client 1',
      email: 'Email 1',
      document: '12345678901',
      address: new Address({
        street: 'Rua 1',
        number: '123',
        complement: 'Casa',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '12345678'
      })
    })

    const orderProps = {
      id: new Id('123'),
      client,
      products: [product1, product2]
    }

    const order = new Order(orderProps)

    await repository.addOrder(order)

    const orderCreated = await OrderModel.findOne({
      where: { id: '123' },
      include: ['products', 'client']
    })

    expect(orderCreated.id).toBe(order.id.id)
    expect(orderCreated.client.name).toBe(order.client.name)
    expect(orderCreated.client.email).toBe(order.client.email)
    expect(orderCreated.client.document).toBe(order.client.document)
    expect(orderCreated.client.street).toBe(order.client.address.street)
    expect(orderCreated.client.number).toBe(order.client.address.number)
    expect(orderCreated.client.complement).toBe(order.client.address.complement)
    expect(orderCreated.client.city).toBe(order.client.address.city)
    expect(orderCreated.client.state).toBe(order.client.address.state)
    expect(orderCreated.client.zipCode).toBe(order.client.address.zipCode)
    expect(orderCreated.products[0].id).toBe(order.products[0].id.id)
    expect(orderCreated.products[0].name).toBe(order.products[0].name)
    expect(orderCreated.products[0].description).toBe(order.products[0].description)
    expect(orderCreated.products[0].salesPrice).toBe(order.products[0].salesPrice)
    expect(orderCreated.products[1].id).toBe(order.products[1].id.id)
    expect(orderCreated.products[1].name).toBe(order.products[1].name)
    expect(orderCreated.products[1].description).toBe(order.products[1].description)
    expect(orderCreated.products[1].salesPrice).toBe(order.products[1].salesPrice)
  })
  it('should find a order', async () => {
    const repository = new OrderRepository()

    const product1 = new Product({
      id: new Id('123'),
      name: 'Product 1',
      description: 'Product 1',
      salesPrice: 10
    })

    const product2 = new Product({
      id: new Id('456'),
      name: 'Product 2',
      description: 'Product 2',
      salesPrice: 20
    })

    const client = new Client({
      id: new Id('1'),
      name: 'Client 1',
      email: 'Email 1',
      document: '12345678901',
      address: new Address({
        street: 'Rua 1',
        number: '123',
        complement: 'Casa',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '12345678'
      })
    })

    const orderProps = {
      id: new Id('123'),
      client,
      products: [product1, product2]
    }

    const order = new Order(orderProps)

    await repository.addOrder(order)

    const output = await repository.findOrder('123')

    expect(output.id.id).toBe(order.id.id)
    expect(output.client.id.id).toBe(order.client.id.id)
    expect(output.client.name).toBe(order.client.name)
    expect(output.client.email).toBe(order.client.email)
    expect(output.client.document).toBe(order.client.document)
    expect(output.client.address.street).toBe(order.client.address.street)
    expect(output.client.address.number).toBe(order.client.address.number)
    expect(output.client.address.complement).toBe(order.client.address.complement)
    expect(output.client.address.city).toBe(order.client.address.city)
    expect(output.client.address.state).toBe(order.client.address.state)
    expect(output.client.address.zipCode).toBe(order.client.address.zipCode)
    expect(output.products[0].id.id).toBe(order.products[0].id.id)
    expect(output.products[0].name).toBe(order.products[0].name)
    expect(output.products[0].description).toBe(order.products[0].description)
    expect(output.products[0].salesPrice).toBe(order.products[0].salesPrice)
    expect(output.products[1].id.id).toBe(order.products[1].id.id)
    expect(output.products[1].name).toBe(order.products[1].name)
    expect(output.products[1].description).toBe(order.products[1].description)
    expect(output.products[1].salesPrice).toBe(order.products[1].salesPrice)
  })
})
