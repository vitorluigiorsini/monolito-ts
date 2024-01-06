import { Sequelize } from 'sequelize-typescript'
import { InvoiceModel } from '../repository/invoice.model'
import { InvoiceItemsModel } from '../repository/invoice-items.model'
import InvoiceRepository from '../repository/invoice.repository'
import GenerateInvoiceUseCase from '../usecase/generate/generate.usecase'
import InvoiceItems from '../domain/invoice-items.entity'
import InvoiceFacade from './invoice.facade'
import FindInvoiceUseCase from '../usecase/find/find.usecase'
import InvoiceFacadeFactory from '../factory/facade.factory'

describe('InvoiceFacade tests', () => {
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

  it('should create an invoice', async () => {
    const repository = new InvoiceRepository()
    const generateUseCase = new GenerateInvoiceUseCase(repository)
    const facade = new InvoiceFacade({
      generateUseCase: generateUseCase,
      findUseCase: undefined
    })

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

    const invoice = await facade.generate(input)

    expect(invoice.id).toBeDefined()
    expect(invoice.name).toBe(input.name)
    expect(invoice.document).toBe(input.document)
    expect(invoice.street).toBe(input.street)
    expect(invoice.number).toBe(input.number)
    expect(invoice.complement).toBe(input.complement)
    expect(invoice.city).toBe(input.city)
    expect(invoice.state).toBe(input.state)
    expect(invoice.zipCode).toBe(input.zipCode)
    expect(invoice.items).toHaveLength(2)
    expect(invoice.items[0].id).toBeDefined()
    expect(invoice.items[0].name).toBe(item1.name)
    expect(invoice.items[0].price).toBe(item1.price)
    expect(invoice.items[1].id).toBeDefined()
    expect(invoice.items[1].name).toBe(item2.name)
    expect(invoice.items[1].price).toBe(item2.price)
    expect(invoice.total).toBe(30)
  })

  it('should find an invoice', async () => {
    // const repository = new InvoiceRepository()
    // const generateUseCase = new GenerateInvoiceUseCase(repository)
    // const findUseCase = new FindInvoiceUseCase(repository)
    // const facade = new InvoiceFacade({
    //   generateUseCase: generateUseCase,
    //   findUseCase: findUseCase
    // })

    const facade = InvoiceFacadeFactory.create()

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

    const invoice = await facade.generate(input)

    const output = await facade.find({ id: invoice.id })

    expect(output.id).toBe(invoice.id)
    expect(output.name).toBe(input.name)
    expect(output.document).toBe(input.document)
    expect(output.address.street).toBe(input.street)
    expect(output.address.number).toBe(input.number)
    expect(output.address.complement).toBe(input.complement)
    expect(output.address.city).toBe(input.city)
    expect(output.address.state).toBe(input.state)
    expect(output.address.zipCode).toBe(input.zipCode)
    expect(output.items[0].id).toBe(input.items[0].id.id)
    expect(output.items[0].name).toBe(input.items[0].name)
    expect(output.items[0].price).toBe(input.items[0].price)
    expect(output.items[1].id).toBe(input.items[1].id.id)
    expect(output.items[1].name).toBe(input.items[1].name)
    expect(output.items[1].price).toBe(input.items[1].price)
  })
})
