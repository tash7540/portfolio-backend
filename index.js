import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
const corsOptions = {
    origin: 'https://aquamarine-kleicha-5c0aae.netlify.app/',
    credentials: true,
};
app.use(cors(corsOptions));
dotenv.config();
//get route used to test api
app.get('/', async (req, res) => {
  try {
      res.status(200).json("Welcome to the server!");
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
});
app.use('/posts', postRoutes);



const PORT = process.env.PORT|| 5000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
