import UseCaseInterface from '../../@shared/usecase/usecase.iterface'
import { PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto } from './checkout.facade.interface'

export default class CheckoutFacade {
  private placeOrderUseCase: UseCaseInterface

  constructor(placeOrderUseCase: UseCaseInterface) {
    this.placeOrderUseCase = placeOrderUseCase
  }

  async placeOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto> {
    return await this.placeOrderUseCase.execute(input)
  }
}
