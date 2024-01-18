import { Sequelize } from 'sequelize-typescript'
import ClientModel from './client.model'
import ClientRepository from './client.repository'
import Id from '../../@shared/domain/value-object/id.value-object'
import Client from '../domain/client.entity'
import Address from '../../@shared/domain/value-object/address.value-object'

describe('client repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new client', async () => {
    const client = new Client({
      id: new Id('1'),
      name: 'Client 1',
      email: 'client@example.com',
      document: '00000000000',
      address: new Address({
        street: 'Client street',
        number: '1',
        complement: 'Client complement',
        city: 'Client city',
        state: 'Client state',
        zipCode: '00000000'
      })
    })

    const repository = new ClientRepository()
    await repository.add(client)

    const clientDb = await ClientModel.findOne({ where: { id: '1' } })

    expect(clientDb).toBeDefined()
    expect(clientDb.id).toEqual(client.id.id)
    expect(clientDb.name).toEqual(client.name)
    expect(clientDb.email).toEqual(client.email)
    expect(clientDb.document).toEqual(client.document)
    expect(clientDb.street).toEqual(client.address.street)
    expect(clientDb.number).toEqual(client.address.number)
    expect(clientDb.complement).toEqual(client.address.complement)
    expect(clientDb.city).toEqual(client.address.city)
    expect(clientDb.state).toEqual(client.address.state)
    expect(clientDb.zipCode).toEqual(client.address.zipCode)
    expect(clientDb.createdAt).toEqual(client.createdAt)
    expect(clientDb.updatedAt).toEqual(client.updatedAt)
  })

  it('should find a client', async () => {
    const client = await ClientModel.create({
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

    const respository = new ClientRepository()
    const result = await respository.find(client.id)

    expect(result.id.id).toEqual(client.id)
    expect(result.name).toEqual(client.name)
    expect(result.email).toEqual(client.email)
    expect(result.address.street).toEqual(client.street)
    expect(result.address.number).toEqual(client.number)
    expect(result.address.complement).toEqual(client.complement)
    expect(result.address.city).toEqual(client.city)
    expect(result.address.state).toEqual(client.state)
    expect(result.address.zipCode).toEqual(client.zipCode)
    expect(result.createdAt).toEqual(client.createdAt)
    expect(result.updatedAt).toEqual(client.updatedAt)
  })
})
