const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(cors());
app.use(express.json());
app.use('/api/expenses', expenseRoutes);
app.use('/api/auth', authRoutes);

mongoose
    .connect(
        process.env.MONGO_URI
    )
    .then(result => {
        app.listen(8080);
    })
    .catch(err => console.log(err));