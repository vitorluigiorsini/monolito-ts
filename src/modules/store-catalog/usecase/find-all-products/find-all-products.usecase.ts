import UseCaseInterface from '../../../@shared/usecase/usecase.iterface'
import { CatalogProductGateway } from '../../gateway/product.gateway'
import { FindAllProductsInputDto, FindAllProductsOutputDto } from './find-all-products.usecase.dto'

export default class FindAllProductsUsecase implements UseCaseInterface {
  constructor(private productRepository: CatalogProductGateway) {}

  async execute(input: FindAllProductsInputDto): Promise<FindAllProductsOutputDto> {
    const products = await this.productRepository.findAll(input)

    return {
      products: products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      }))
    }
  }
}
