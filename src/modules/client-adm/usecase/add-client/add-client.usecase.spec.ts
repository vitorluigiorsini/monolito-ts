import Address from '../../../@shared/domain/value-object/address.value-object'
import AddClientUseCase from './add-client.usecase'

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('add client usecase unit test', () => {
  it('should add a client', async () => {
    const repository = MockRepository()
    const usecase = new AddClientUseCase(repository)

    const input = {
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
    }

    const result = await usecase.execute(input)

    expect(repository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
    expect(result.email).toEqual(input.email)
    expect(result.address).toEqual(input.address)
  })
})
