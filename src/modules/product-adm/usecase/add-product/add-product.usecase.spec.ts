import AddProductUseCase from './add-product.usecase'

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('Add product usecase unit test', () => {
  it('should add a product', async () => {
    const productRepository = MockRepository()
    const usecase = new AddProductUseCase(productRepository)

    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10
    }

    const result = await usecase.execute(input)

    expect(productRepository.add).toBeCalled()
    expect(result.id).toBe(input.id)
    expect(result.name).toBe(input.name)
    expect(result.description).toBe(input.description)
    expect(result.purchasePrice).toBe(input.purchasePrice)
    expect(result.stock).toBe(input.stock)
  })
})
