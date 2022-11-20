import { Dialect, Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbDriver = process.env.DB_DRIVER as Dialect


const sequelizeConnection = new Sequelize("file", "root", '', {
  host: 'localhost',
  dialect: "mysql",
  
})


export default sequelizeConnection