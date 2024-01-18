import { Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import OrderModel from './order.model'

@Table({
  tableName: 'order_products',
  timestamps: false
})
export default class OrderProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  orderId: string

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  description: string

  @Column({ allowNull: false })
  salesPrice: number
}
