import { CatalogProductGateway } from '../../gateway/product.gateway'
import { FindProductInputDto, FindProductOutputDto } from './find-product.usecase.dto'

export default class FindProductUseCase {
  constructor(private readonly productRepository: CatalogProductGateway) {}

  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this.productRepository.find(input.id)

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    }
  }
}
