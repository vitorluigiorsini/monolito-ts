import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'
import { clientRoute } from './routes/client.route'
import { productRoute } from './routes/product.route'
import { invoiceRoute } from './routes/invoice.route'
import { checkoutRoute } from './routes/checkout.route'
import ClientModel from '../../modules/client-adm/repository/client.model'
import ProductModel from '../../modules/product-adm/repository/product.model'
import CatalogProductModel from '../../modules/store-catalog/repository/product.model'
import InvoiceModel from '../../modules/invoice/repository/invoice.model'
import InvoiceItemsModel from '../../modules/invoice/repository/invoice-items.model'
import TransactionModel from '../../modules/payment/repository/transaction.model'
import OrderModel from '../../modules/checkout/repository/order.model'
import OrderClientModel from '../../modules/checkout/repository/order-client.model'
import OrderProductModel from '../../modules/checkout/repository/order-product.model'

export const app: Express = express()
app.use(express.json())
app.use('/checkout', checkoutRoute)
app.use('/client', clientRoute)
app.use('/invoice', invoiceRoute)
app.use('/product', productRoute)

export let sequelize: Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  })
  await sequelize.addModels([
    ClientModel,
    ProductModel,
    InvoiceModel,
    InvoiceItemsModel,
    OrderModel,
    CatalogProductModel,
    OrderClientModel,
    OrderProductModel,
    TransactionModel
  ])
  await sequelize.sync()
}
setupDb()
