import Address from '../../../@shared/domain/value-object/address.value-object'
import Id from '../../../@shared/domain/value-object/id.value-object'
import Invoice from '../../domain/invoice'
import InvoiceItems from '../../domain/invoice-items.entity'
import FindInvoiceUseCase from './find.usecase'

const item1 = new InvoiceItems({
  name: 'Item 1',
  price: 10
})

const item2 = new InvoiceItems({
  name: 'Item 2',
  price: 20
})

const invoice = new Invoice({
  id: new Id('123'),
  name: 'Invoice 1',
  document: '12345678901',
  items: [item1, item2]
})

const address = new Address({
  street: 'Rua 1',
  number: '123',
  complement: 'Casa',
  city: 'São Paulo',
  state: 'SP',
  zipCode: '12345678'
})

invoice.changeAddress(address)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    generate: jest.fn()
  }
}

describe('FindUseCase unit test', () => {
  it('should find a invoice', async () => {
    const repository = MockRepository()
    const usecase = new FindInvoiceUseCase(repository)

    const output = await usecase.execute({ id: '123' })

    expect(output.id).toBe(invoice.id.id)
    expect(output.name).toBe(invoice.name)
    expect(output.document).toBe(invoice.document)
    expect(output.address.street).toBe(invoice.address.street)
    expect(output.address.number).toBe(invoice.address.number)
    expect(output.address.complement).toBe(invoice.address.complement)
    expect(output.address.city).toBe(invoice.address.city)
    expect(output.address.state).toBe(invoice.address.state)
    expect(output.address.zipCode).toBe(invoice.address.zipCode)
    expect(output.items[0].id).toBe(invoice.items[0].id.id)
    expect(output.items[0].name).toBe(invoice.items[0].name)
    expect(output.items[0].price).toBe(invoice.items[0].price)
    expect(output.items[1].id).toBe(invoice.items[1].id.id)
    expect(output.items[1].name).toBe(invoice.items[1].name)
    expect(output.items[1].price).toBe(invoice.items[1].price)
  })
})
