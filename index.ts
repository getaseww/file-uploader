import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import routes from './routes/index'
import dbInit from './db/init';

console.log(__dirname);

const cors = require('cors')

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

dbInit();


app.use(cors())
app.use(express.json())
app.use('/api',routes)

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});