'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

mongoose.connect('mongodb+srv://balta:balta@cluster0-vyiiw.mongodb.net/test?retryWrites=true');

const Product = require('./models/product');

//Carrega as rotas
const indexRoute = require('./router/index-route');
const productRoute = require('./router/product-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', indexRoute);
app.use('/products', productRoute);

module.exports = app;