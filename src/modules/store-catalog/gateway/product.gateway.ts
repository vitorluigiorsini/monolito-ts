import Product from '../../product-adm/domain/product.entity'
import CatalogProduct from '../domain/product.entity'

export interface CatalogProductGateway {
  add(product: CatalogProduct): Promise<void>
  findAll(input: any): Promise<CatalogProduct[]>
  find(id: string): Promise<CatalogProduct>
}

export interface ProductGateway {
  add(product: Product): Promise<void>
  find(id: string): Promise<Product>
}
