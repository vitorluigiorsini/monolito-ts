import UseCaseInterface from '../../@shared/usecase/usecase.iterface'
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto
} from './product-adm.facade.interface'

export interface UseCaseProps {
  addProductUseCase: UseCaseInterface
  checkStockUseCase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addProductUsecase: UseCaseInterface
  private _checkStockUsecase: UseCaseInterface

  constructor(usecaseProps: UseCaseProps) {
    this._addProductUsecase = usecaseProps.addProductUseCase
    this._checkStockUsecase = usecaseProps.checkStockUseCase
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this._addProductUsecase.execute(input)
  }
  checkStock(input: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUsecase.execute(input)
  }
}
