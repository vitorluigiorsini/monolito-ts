import express, { Request, Response } from 'express'
import InvoiceFacadeFactory from '../../../modules/invoice/factory/facade.factory'

export const invoiceRoute = express.Router()

invoiceRoute.get('/:id', async (req: Request, res: Response) => {
  const facade = InvoiceFacadeFactory.create()
  try {
    const invoiceDto = {
      id: req.params.id as string
    }

    const output = await facade.find(invoiceDto)
    res.send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})
