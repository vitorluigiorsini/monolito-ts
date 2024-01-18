import Id from '../../../@shared/domain/value-object/id.value-object'
import Product from '../../domain/product.entity'
import { CatalogProductGateway, ProductGateway } from '../../gateway/product.gateway'
import { AddProductInputDto, AddProductOutputDto } from './add-product.usecase.dto'

export interface AddProductUseCaseProps {
  catalogRepository: CatalogProductGateway
  productRepository: ProductGateway
}

export default class AddProductUseCase {
  private _catalogRepository: CatalogProductGateway
  private _productRepository: ProductGateway

  constructor(usecaseprops: AddProductUseCaseProps) {
    this._catalogRepository = usecaseprops.catalogRepository
    this._productRepository = usecaseprops.productRepository
  }

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const admProduct = await this._productRepository.find(input.id)

    if (!admProduct) {
      throw new Error(`Product id: ${input.id} not found`)
    }

    const props = {
      id: new Id(input.id),
      name: admProduct.name,
      description: admProduct.description,
      salesPrice: input.salesPrice
    }
    const product = new Product(props)

    await this._catalogRepository.add(product)

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    }
  }
}
