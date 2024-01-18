import { Column, HasMany, HasOne, Model, PrimaryKey, Table } from 'sequelize-typescript'
import OrderProductModel from './order-product.model'
import OrderClientModel from './order-client.model'

@Table({
  tableName: 'orders',
  timestamps: false
})
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @HasOne(() => OrderClientModel)
  client: OrderClientModel

  @HasMany(() => OrderProductModel)
  products: OrderProductModel[]

  @Column({ allowNull: false })
  status: number

  @Column({ allowNull: false })
  createdAt: Date

  @Column({ allowNull: false })
  updatedAt: Date
}
