import { Sequelize } from 'sequelize-typescript'
import InvoiceModel from './invoice.model'
import InvoiceItemsModel from './invoice-items.model'
import InvoiceItems from '../domain/invoice-items.entity'
import Invoice from '../domain/invoice'
import Id from '../../@shared/domain/value-object/id.value-object'
import Address from '../../@shared/domain/value-object/address.value-object'
import InvoiceRepository from './invoice.repository'

describe('InvoiceRepository unit tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([InvoiceModel, InvoiceItemsModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })
  it('should create a invoice', async () => {
    const repository = new InvoiceRepository()

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

    await repository.generate(invoice)

    const invoiceCreated = await InvoiceModel.findOne({ where: { id: '123' }, include: 'items' })

    expect(invoiceCreated.id).toBe(invoice.id.id)
    expect(invoiceCreated.name).toBe(invoice.name)
    expect(invoiceCreated.document).toBe(invoice.document)
    expect(invoiceCreated.street).toBe(invoice.address.street)
    expect(invoiceCreated.number).toBe(invoice.address.number)
    expect(invoiceCreated.complement).toBe(invoice.address.complement)
    expect(invoiceCreated.city).toBe(invoice.address.city)
    expect(invoiceCreated.state).toBe(invoice.address.state)
    expect(invoiceCreated.zipCode).toBe(invoice.address.zipCode)
    expect(invoiceCreated.items[0].id).toBe(invoice.items[0].id.id)
    expect(invoiceCreated.items[0].name).toBe(invoice.items[0].name)
    expect(invoiceCreated.items[0].price).toBe(invoice.items[0].price)
    expect(invoiceCreated.items[1].id).toBe(invoice.items[1].id.id)
    expect(invoiceCreated.items[1].name).toBe(invoice.items[1].name)
    expect(invoiceCreated.items[1].price).toBe(invoice.items[1].price)
  })
  it('should find a invoice', async () => {
    const repository = new InvoiceRepository()

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

    await repository.generate(invoice)

    const output = await repository.find('123')

    expect(output.id.id).toBe(invoice.id.id)
    expect(output.name).toBe(invoice.name)
    expect(output.document).toBe(invoice.document)
    expect(output.address.street).toBe(invoice.address.street)
    expect(output.address.number).toBe(invoice.address.number)
    expect(output.address.complement).toBe(invoice.address.complement)
    expect(output.address.city).toBe(invoice.address.city)
    expect(output.address.state).toBe(invoice.address.state)
    expect(output.address.zipCode).toBe(invoice.address.zipCode)
    expect(output.items[0].id.id).toBe(invoice.items[0].id.id)
    expect(output.items[0].name).toBe(invoice.items[0].name)
    expect(output.items[0].price).toBe(invoice.items[0].price)
    expect(output.items[1].id.id).toBe(invoice.items[1].id.id)
    expect(output.items[1].name).toBe(invoice.items[1].name)
    expect(output.items[1].price).toBe(invoice.items[1].price)
  })
})
