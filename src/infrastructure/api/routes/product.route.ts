import express, { Request, Response } from 'express'
import ProductAdmFacadeFactory from '../../../modules/product-adm/factory/facade.factory'
import StoreCatalogFacadeFactory from '../../../modules/store-catalog/factory/facade.factory'

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
  const facade = ProductAdmFacadeFactory.create()
  try {
    const productDto = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock
    }

    const output = await facade.addProduct(productDto)
    res.send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

productRoute.post('/catalog', async (req: Request, res: Response) => {
  const facade = StoreCatalogFacadeFactory.create()
  try {
    const productDto = {
      id: req.body.id,
      salesPrice: req.body.salesPrice
    }

    const output = await facade.add(productDto)
    res.send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})
