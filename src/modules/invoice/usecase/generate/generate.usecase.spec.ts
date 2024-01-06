import InvoiceItems from '../../domain/invoice-items.entity'
import GenerateInvoiceUseCase from './generate.usecase'

const invoice = {
  id: '1',
  name: 'Invoice 1',
  document: '123456789',
  street: 'Street 1',
  number: '123',
  complement: 'Complement 1',
  city: 'City 1',
  state: 'State 1',
  zipCode: '12345678',
  items: [
    {
      id: '1',
      name: 'Item 1',
      price: 10
    },
    {
      id: '2',
      name: 'Item 2',
      price: 20
    }
  ],
  total: 30
}

const MockRepository = () => {
  return {
    find: jest.fn(),
    generate: jest.fn().mockReturnValue(Promise.resolve(invoice))
  }
}
describe('GenerateInvoiceUseCase unit test', () => {
  it('should create an invoice', async () => {
    const repository = MockRepository()
    const usecase = new GenerateInvoiceUseCase(repository)

    const item1 = new InvoiceItems({
      name: 'Item 1',
      price: 10
    })

    const item2 = new InvoiceItems({
      name: 'Item 2',
      price: 20
    })

    const input = {
      name: 'Invoice 1',
      document: '123456789',
      street: 'Street 1',
      number: '123',
      complement: 'Complement 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: '12345678',
      items: [item1, item2]
    }

    const result = await usecase.execute(input)

    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name)
    expect(result.document).toBe(input.document)
    expect(result.street).toBe(input.street)
    expect(result.number).toBe(input.number)
    expect(result.complement).toBe(input.complement)
    expect(result.city).toBe(input.city)
    expect(result.state).toBe(input.state)
    expect(result.zipCode).toBe(input.zipCode)
    expect(result.items).toHaveLength(2)
    expect(result.items[0].id).toBeDefined()
    expect(result.items[0].name).toBe(item1.name)
    expect(result.items[0].price).toBe(item1.price)
    expect(result.items[1].id).toBeDefined()
    expect(result.items[1].name).toBe(item2.name)
    expect(result.items[1].price).toBe(item2.price)
    expect(result.total).toBe(30)
  })
})
