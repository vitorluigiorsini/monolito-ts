import ProductRepository from '../../product-adm/repository/product.repository'
import StoreCatalogFacade from '../facade/store-catalog.facade'
import CatalogProductRepository from '../repository/product.repository'
import AddProductUseCase from '../usecase/add-product/add-product.usecase'
import FindAllProductsUsecase from '../usecase/find-all-products/find-all-products.usecase'
import FindProductUseCase from '../usecase/find-product/find-product.usecase'

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const catalogRepository = new CatalogProductRepository()
    const productRepository = new ProductRepository()
    const addUseCase = new AddProductUseCase({ catalogRepository, productRepository })
    const findUseCase = new FindProductUseCase(catalogRepository)
    const findAllUseCase = new FindAllProductsUsecase(catalogRepository)

    const facade = new StoreCatalogFacade({
      addUseCase: addUseCase,
      findUseCase: findUseCase,
      findAllUseCase: findAllUseCase
    })
    return facade
  }
}
