import { Sequelize } from 'sequelize-typescript'
import { TransactionModel } from './transaction.model'
import ProcessPaymentUseCase from '../usecase/process-payment/process-payment.usecase'
import TransactionRepository from './transaction.repository'
import Transaction from '../domain/transaction'

describe('transaction repository tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([TransactionModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should save a transaction', async () => {
    const repository = new TransactionRepository()
    const transaction = new Transaction({
      orderId: '1',
      amount: 100
    })
    transaction.process()

    const result = await repository.save(transaction)

    expect(result.id.id).toBe(transaction.id.id)
    expect(result.orderId).toBe(transaction.orderId)
    expect(result.amount).toBe(transaction.amount)
    expect(result.status).toBe(transaction.status)
    expect(result.createdAt).toBe(transaction.createdAt)
    expect(result.updatedAt).toBe(transaction.updatedAt)
  })
})
