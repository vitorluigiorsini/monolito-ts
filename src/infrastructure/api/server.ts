import dotenv from 'dotenv'
import { app } from './express'

dotenv.config()
const port: number = Number(process.env.PORT) || 3333

app.listen(port, () => {
  console.log(`Server is listening onport ${port}`)
})
