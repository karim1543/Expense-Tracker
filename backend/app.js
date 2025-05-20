const express = require('express');
const mongoose = require('mongoose');
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
mongoose
    .connect(
        'mongodb+srv://karim:lolxdlol@expenses.dptwlyq.mongodb.net/messages'
    )
    .then(result => {
        app.listen(8080);
    })
    .catch(err => console.log(err));