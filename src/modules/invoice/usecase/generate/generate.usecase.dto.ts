import InvoiceItems from '../../domain/invoice-items.entity'

export interface GenerateInvoiceUsecaseInputDto {
  name: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
  items: InvoiceItems[]
}

export interface GenerateInvoiceUsecaseOutputDto {
  id: string
  name: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
  items: {
    id: string
    name: string
    price: number
  }[]
  total: number
}
