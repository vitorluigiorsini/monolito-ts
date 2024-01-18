import Address from '../../@shared/domain/value-object/address.value-object'
import Id from '../../@shared/domain/value-object/id.value-object'
import Client from '../domain/client.entity'
import Order from '../domain/order.entity'
import Product from '../domain/product.entity'
import CheckoutGateway from '../gateway/checkout.gateway'
import OrderClientModel from './order-client.model'
import OrderModel from './order.model'
import OrderProductModel from './order-product.model'

export default class OrderRepository implements CheckoutGateway {
  async findOrder(id: string): Promise<Order | null> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [{ model: OrderProductModel }, { model: OrderClientModel }],
      rejectOnEmpty: true
    })

    const products = await Promise.all(
      orderModel.products.map((product) => {
        const productProps = {
          id: new Id(product.id),
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice
        }
        return new Product(productProps)
      })
    )

    const client = new Client({
      id: new Id(orderModel.client.id),
      name: orderModel.client.name,
      email: orderModel.client.email,
      document: orderModel.client.document,
      address: new Address({
        street: orderModel.client.street,
        number: orderModel.client.number,
        complement: orderModel.client.complement,
        city: orderModel.client.city,
        state: orderModel.client.state,
        zipCode: orderModel.client.zipCode
      })
    })

    const orderProps = {
      id: new Id(orderModel.id),
      client,
      products
    }

    const order = new Order(orderProps)

    return order
  }

  async addOrder(order: Order): Promise<void> {
    await OrderModel.create(
      {
        id: order.id.id,
        client: {
          id: order.client.id.id,
          name: order.client.name,
          email: order.client.email,
          document: order.client.document,
          street: order.client.address.street,
          number: order.client.address.number,
          complement: order.client.address.complement,
          city: order.client.address.city,
          state: order.client.address.state,
          zipCode: order.client.address.zipCode
        },
        products: order.products.map((item) => ({
          id: item.id.id,
          name: item.name,
          description: item.description,
          salesPrice: item.salesPrice
        })),
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      },
      {
        include: [{ model: OrderProductModel }, { model: OrderClientModel }]
      }
    )
  }
}
