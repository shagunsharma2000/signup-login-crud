const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./src/routes/index');

app.use(express.json());
app.use('/api/v1', router);

app.listen(3000, ()=>{
    console.log("welcome");
});
mongoose.connect('mongodb://localhost:27017/krrrrrr')
.then(()=>{
    console.log("connected to mongodb")
})