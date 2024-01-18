import AddProductUseCase from './add-product.usecase'

const MockCatalogRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn()
  }
}

const MockProductRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(
      Promise.resolve({
        id: '1',
        name: 'Product 1',
        description: 'Product 1 description',
        purchasePrice: 100,
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    )
  }
}

describe('Add product usecase unit test', () => {
  it('should add a product', async () => {
    const catalogRepository = MockCatalogRepository()
    const productRepository = MockProductRepository()
    const usecase = new AddProductUseCase({ catalogRepository, productRepository })

    const input = {
      id: '1',
      salesPrice: 100
    }

    const result = await usecase.execute(input)

    expect(catalogRepository.add).toBeCalled()
    expect(result.id).toBe(input.id)
    expect(result.name).toBeDefined()
    expect(result.description).toBeDefined()
  })
})
