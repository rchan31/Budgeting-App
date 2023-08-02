const express = require('express');
const cors = require('cors');
require('dotenv').config();
const transaction = require('./models/transaction.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {res.json('testing')});

app.post('/api/transaction', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {name, description, datetime, price} = req.body;
    const transaction = transaction.create({name, description, datetime, price});
    res.json(transaction);
});

app.get('/api/transactions', (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const transactions = transaction.find();
    res.json(transactions);
});

app.listen(6200);