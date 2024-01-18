import { Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import OrderModel from './order.model'

@Table({
  tableName: 'order_clients',
  timestamps: false
})
export default class OrderClientModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  orderId: string

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  email: string

  @Column({ allowNull: false })
  document: string

  @Column({ allowNull: false })
  street: string

  @Column({ allowNull: false })
  number: string

  @Column({ allowNull: true })
  complement: string

  @Column({ allowNull: false })
  city: string

  @Column({ allowNull: false })
  state: string

  @Column({ allowNull: false })
  zipCode: string
}
