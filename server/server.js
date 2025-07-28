import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

//importing routes
import userRoutes from './routes/UserRoutes.js';
import taskRoutes from './routes/TaskRoutes.js';

//configure dotenv
dotenv.config();

//Port for express app to run
const PORT = process.env.PORT || 5000;

//MongoDB connection URI
const mongoURI = process.env.mongoSecret;

//Express app
const app = express();

//cors policy implementation
app.use(cors());

//Support for json format data
app.use(express.json());

//Route to handle Users
app.use('/user', userRoutes);

//Route to handle Task
app.use('/task', taskRoutes);

// connection to mongodb
mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('App is connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`App is hosted on : http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(`Error : ${error}`);
    });