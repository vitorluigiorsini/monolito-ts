import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({
  tableName: 'catalog_products',
  timestamps: false
})
export default class CatalogProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  description: string

  @Column({ allowNull: false })
  salesPrice: number
}
