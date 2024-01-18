export interface PlaceOrderFacadeInputDto {
  clientId: string
  products: {
    productId: string
  }[]
}

export interface PlaceOrderFacadeOutputDto {
  id: string
  invoiceId: string
  status: string
  total: number
  products: {
    productId: string
  }[]
}

export interface PlaceOrderFacadeInterface {
  placeOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto>
}
