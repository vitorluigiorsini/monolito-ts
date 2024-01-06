import InvoiceItems from '../domain/invoice-items.entity'

export interface FindInvoiceFacadeInputDto {
  id: string
}

export interface FindInvoiceFacadeOutputDto {
  id: string
  name: string
  document: string
  address: {
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
  }
  items: {
    id: string
    name: string
    price: number
  }[]
  total: number
  createdAt: Date
}

export interface GenerateInvoiceFacadeInputDto {
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

export interface GenerateInvoiceFacadeOutputDto {
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

export default interface InvoiceFacadeInterface {
  find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>
  generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>
}
