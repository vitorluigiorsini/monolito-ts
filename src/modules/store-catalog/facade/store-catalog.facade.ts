import UseCaseInterface from '../../@shared/usecase/usecase.iterface'
import AddProductUseCase from '../usecase/add-product/add-product.usecase'
import FindAllProductsUsecase from '../usecase/find-all-products/find-all-products.usecase'
import FindProductUseCase from '../usecase/find-product/find-product.usecase'
import StoreCatalogFacadeInterface, {
  AddCatalogProductFacadeInputDto,
  FindAllStoreCatalogFacadeOutputDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOutputDto
} from './store-catalog.facade.interface'

export interface UseCaseProps {
  addUseCase: UseCaseInterface
  findUseCase: UseCaseInterface
  findAllUseCase: UseCaseInterface
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private _addUseCase: UseCaseInterface
  private _findUseCase: UseCaseInterface
  private _findAllUseCase: UseCaseInterface

  constructor(props: UseCaseProps) {
    this._addUseCase = props.addUseCase
    this._findUseCase = props.findUseCase
    this._findAllUseCase = props.findAllUseCase
  }

  add(input: AddCatalogProductFacadeInputDto): Promise<void> {
    return this._addUseCase.execute(input)
  }
  find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
    return this._findUseCase.execute(id)
  }
  findAll(input: any): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return this._findAllUseCase.execute(input)
  }
}
