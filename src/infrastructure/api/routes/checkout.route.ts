import express, { Request, Response } from 'express'
import CheckoutFacadeFactory from '../../../modules/checkout/factory/facade.factory'

export const checkoutRoute = express.Router()

checkoutRoute.post('/', async (req: Request, res: Response) => {
  const facade = CheckoutFacadeFactory.create()
  try {
    const checkoutDto = {
      clientId: req.body.clientId,
      products: req.body.products
    }

    const output = await facade.placeOrder(checkoutDto)
    res.send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})
