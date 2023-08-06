import mongoose from 'mongoose';
import 'express-async-errors';
import express from 'express';
import { errorMiddleware } from './middlewares/error';
import routes from './routes';
require('dotenv').config();

const mongoURI = 'mongodb://0.0.0.0:27017/soft_design_api_db ';
mongoose.connect(mongoURI)
.then(() => {
    console.log('Connected to MongoDB');

    const app = express();

    app.use(express.json());

    app.use(routes);

    app.use(errorMiddleware);

    const port = process.env.PORT || 4000; 
    app.listen(port, () => console.log(`Server running on port ${port}`));
})
.catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
