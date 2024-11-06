const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const globalErrorHandler = require('./Controller/errorController')
const authRoutes = require('./Routes/authRoutes');

const app = express();
app.use(express.json());








// routes
app.get('/', (req, res, next) => {
    res.send('<h1>OSS-Project</h1>');
});
app.use('/api/v1/auth', authRoutes);







app.use(globalErrorHandler)
module.exports= app;
