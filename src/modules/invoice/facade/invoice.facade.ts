import UseCaseInterface from '../../@shared/usecase/usecase.iterface'
import InvoiceFacadeInterface, {
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
  GenerateInvoiceFacadeOutputDto
} from './invoice.facade.interface'

export interface UseCaseProps {
  findUseCase: UseCaseInterface
  generateUseCase: UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUseCase: UseCaseInterface
  private _generateUseCase: UseCaseInterface

  constructor(usecaseProps: UseCaseProps) {
    this._findUseCase = usecaseProps.findUseCase
    this._generateUseCase = usecaseProps.generateUseCase
  }

  async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
    return await this._findUseCase.execute(input)
  }
  async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this._generateUseCase.execute(input)
  }
}
