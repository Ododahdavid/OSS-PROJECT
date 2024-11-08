// Required Modules
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Custom Modules
const globalErrorHandler = require('./Controller/errorController');
const AppError = require('./utils/appError');

// Routes
const authRoutes = require('./Routes/authRoutes');
const projectRoutes = require('./Routes/projectRoutes');
const docRoutes = require('./Routes/documentRoutes');
const pageRoutes = require('./Routes/pageRoutes');

// Swagger for API documentation
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// Initialize Express app
const app = express();

// Set security HTTP headers
app.use(helmet());

// Enable CORS for all origins
app.use(cors());
app.options('*', cors()); // Enable pre-flight for all routes

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Sanitize data against NoSQL injection and XSS
app.use(mongoSanitize());
app.use(xss());

// Prevent HTTP parameter pollution
app.use(hpp());

// Log requests in development mode
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Rate limiting to prevent abuse
const limiter = rateLimit({
    max: 100, // limit each IP to 100 requests per hour
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again after an hour'
});
app.use('/api', limiter); // Apply to all API routes

// Basic Routes
app.get('/', (req, res) => {
    res.send("<h1>OSS-Project</h1><a href='/api-docs'>API Documentation</a>");
});

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Mounting Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/documents', docRoutes);
app.use('/api/v1/pages', pageRoutes);

// Handle Unhandled Routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
