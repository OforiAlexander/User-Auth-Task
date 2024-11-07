import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import webRouter from './router/web.js';
import { checkDbConnection } from './config/DB.js';
import sequelize from './config/DB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], //CORS additional configurations
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// The middlewares
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Async function to initialize the database
async function initializeDatabase() {
    try {
        await checkDbConnection();
        await sequelize.sync({ alter: true });
        console.log('Database connected and synced successfully');
    } catch (error) {
        console.error('Database connection/sync failed:', error.message);
        process.exit(1);
    }
}

initializeDatabase();

// Routes
app.use('/', webRouter);

// 404 Not Found handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Requested route not found"
    });
});

app.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal server error",
        ...(process.env.NODE_ENV === 'development' && { error: err.stack })
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`CORS enabled for: ${corsOptions.origin}`);
});

export default app;