import Address from '../../@shared/domain/value-object/address.value-object'
import Id from '../../@shared/domain/value-object/id.value-object'
import Invoice from '../domain/invoice'
import InvoiceItems from '../domain/invoice-items.entity'
import InvoiceGateway from '../gateway/invoice.gateway'
import { InvoiceItemsModel } from './invoice-items.model'
import { InvoiceModel } from './invoice.model'

export default class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const invoiceModel = await InvoiceModel.findOne({
      where: { id },
      include: [{ model: InvoiceItemsModel }],
      rejectOnEmpty: true
    })

    const invoice = new Invoice({
      id: new Id(invoiceModel.id),
      name: invoiceModel.name,
      document: invoiceModel.document,
      items: invoiceModel.items.map((item) => {
        return new InvoiceItems({
          id: new Id(item.id),
          name: item.name,
          price: item.price
        })
      }),
      createdAt: invoiceModel.createdAt,
      updatedAt: invoiceModel.updatedAt
    })

    const address = new Address({
      street: invoiceModel.street,
      number: invoiceModel.number,
      complement: invoiceModel.complement,
      city: invoiceModel.city,
      state: invoiceModel.state,
      zipCode: invoiceModel.zipCode
    })

    invoice.changeAddress(address)

    return invoice
  }

  async generate(invoice: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
        items: invoice.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        })),
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt
      },
      {
        include: [{ model: InvoiceItemsModel }]
      }
    )
  }
}
