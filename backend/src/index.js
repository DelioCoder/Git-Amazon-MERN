const express = require('express');

const cors = require('cors');

import dotenv from 'dotenv';

import data from './data';

import config from './config';

import mongoose from 'mongoose';

import bodyParser from 'body-parser';

import userRoute from './routes/userRoute';

const app = express();

dotenv.config();

//connect to mongoDB

const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).catch(error => console.log(error.reason));


//middlewares

app.use(bodyParser.json());

app.use(cors());

app.use(express.json());

//routes

app.use('/api/users', userRoute);

app.get('/api/products', (req, res) => {

    res.send(data.products);

});

app.get('/api/products/:id', (req, res) => {
    
    const productId = req.params.id;
    const product = data.products.find(x=>x._id === productId);
    if(product){
        res.send(product);
    }
    else
    {
        res.status(404).send({msg: "Product Not Found."})
    }

});

app.listen(5000, () => {console.log("Server started at http://localhost:5000")});