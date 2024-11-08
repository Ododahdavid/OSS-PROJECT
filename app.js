const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const globalErrorHandler = require('./Controller/errorController')
const authRoutes = require('./Routes/authRoutes');
const projectRoutes = require('./Routes/projectRoutes');
const docRoutes=require('./Routes/documentRoutes');
const pageRoutes=require('./Routes/pageRoutes');
const app = express();
app.use(express.json());








// routes
app.get('/', (req, res, next) => {
    res.send('<h1>OSS-Project</h1>');
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects',projectRoutes);
app.use('/api/v1/document',docRoutes)
app.use('/api/v1/pages',pageRoutes);







app.use(globalErrorHandler)
module.exports= app;
