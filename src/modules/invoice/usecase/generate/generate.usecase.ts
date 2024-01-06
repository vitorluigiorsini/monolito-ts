import Address from '../../../@shared/domain/value-object/address.value-object'
import Invoice from '../../domain/invoice'
import InvoiceItems from '../../domain/invoice-items.entity'
import InvoiceGateway from '../../gateway/invoice.gateway'
import {
  GenerateInvoiceUsecaseInputDto,
  GenerateInvoiceUsecaseOutputDto
} from './generate.usecase.dto'

export default class GenerateInvoiceUseCase {
  private _generateInvoiceRepository: InvoiceGateway

  constructor(generateInvoiceRepository: InvoiceGateway) {
    this._generateInvoiceRepository = generateInvoiceRepository
  }

  async execute(input: GenerateInvoiceUsecaseInputDto): Promise<GenerateInvoiceUsecaseOutputDto> {
    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      items: input.items
    })

    const address = new Address({
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode
    })

    invoice.changeAddress(address)

    await this._generateInvoiceRepository.generate(invoice)

    return {
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
        price: item.price
      })),
      total: invoice.items.reduce((total, item) => total + item.price, 0)
    }
  }
}
