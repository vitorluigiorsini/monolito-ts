import { Sequelize } from 'sequelize-typescript'
import ClientModel from '../repository/client.model'
import ClientRepository from '../repository/client.repository'
import AddClientUseCase from '../usecase/add-client/add-client.usecase'
import ClientAdmFacade from './client-adm.facade'
import ClientAdmFacadeFactory from '../factory/facade.factory'

describe('ClientAdmFacade tests', () => {
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

  it('should create a client', async () => {
    const respository = new ClientRepository()
    const addUseCase = new AddClientUseCase(respository)
    const facade = new ClientAdmFacade({
      addUseCase: addUseCase,
      findUseCase: undefined
    })

    const input = {
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
    }

    await facade.add(input)

    const client = await ClientModel.findOne({ where: { id: '1' } })

    expect(client).toBeDefined()
    expect(client.id).toEqual(input.id)
    expect(client.name).toEqual(input.name)
    expect(client.email).toEqual(input.email)
    expect(client.document).toEqual(input.document)
    expect(client.street).toEqual(input.address.street)
  })

  it('should find a client', async () => {
    // const respository = new ClientRepository()
    // const addUseCase = new AddClientUseCase(respository)
    // const findUseCase = new FindClientUseCase(respository)
    // const facade = new ClientAdmFacade({
    //   addUseCase: addUseCase,
    //   findUseCase: findUseCase
    // })

    const facade = ClientAdmFacadeFactory.create()

    const input = {
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
    }

    await facade.add(input)

    const client = await facade.find({ id: '1' })

    expect(client).toBeDefined()
    expect(client.id).toEqual(input.id)
    expect(client.name).toEqual(input.name)
    expect(client.email).toEqual(input.email)
    expect(client.address).toEqual(input.address)
  })
})
