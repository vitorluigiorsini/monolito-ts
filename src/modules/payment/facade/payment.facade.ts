import UseCaseInterface from '../../@shared/usecase/usecase.iterface'
import Transaction from '../domain/transaction'
import PaymentFacadeInterface, {
  PaymentFacadeInputDto,
  PaymentFacadeOutputDto
} from './payment.facade.interface'

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private processPaymentUseCase: UseCaseInterface) {}

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return await this.processPaymentUseCase.execute(input)
  }
}
