import express, { request, response } from 'express'
import mongoose from 'mongoose';
import {PORT, mongoDBURL} from './config.js';
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handeling CORS policy
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// Option 2: Allow Custom Origins
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN stack Tutorial');
})

app.use('/books', bookRoute)



mongoose.connect(mongoDBURL).then(() => {
    console.log('App connected to Database');
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
}).catch((error) => {
    console.log(error)
});