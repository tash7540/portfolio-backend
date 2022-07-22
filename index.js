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
    origin: 'https://62db16bae705d10eeea56743--aquamarine-kleicha-5c0aae.netlify.app',
    credentials: true,
};
app.use(cors(corsOptions));
dotenv.config();
app.use('/posts', postRoutes);


const PORT = process.env.PORT|| 5000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
