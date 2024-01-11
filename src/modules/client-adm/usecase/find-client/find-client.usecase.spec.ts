import Address from '../../../@shared/domain/value-object/address.value-object'
import Id from '../../../@shared/domain/value-object/id.value-object'
import Client from '../../domain/client.entity'
import FindClientUseCase from './find-client.usecase'

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

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client))
  }
}

describe('find client usecase unit test', () => {
  it('should find a client', async () => {
    const repository = MockRepository()
    const usecase = new FindClientUseCase(repository)

    const input = {
      id: '1'
    }

    const result = await usecase.execute(input)

    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toBe(input.id)
    expect(result.name).toEqual(client.name)
    expect(result.email).toEqual(client.email)
    expect(result.document).toEqual(client.document)
    expect(result.address.street).toEqual(client.address.street)
    expect(result.createdAt).toEqual(client.createdAt)
    expect(result.updatedAt).toEqual(client.updatedAt)
  })
})
