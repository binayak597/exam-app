import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js';

const app = express();

app.use(express.json())
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world")
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {

  connectDB();
  console.log(`Server is up and running at PORT ${PORT}`)
})
