import express from 'express'
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: ' Server is running smoothly'
    });
});
// API routes
app.use('/api/auth', authRoutes);
// Global error handler
app.use(errorHandler);

export default app;