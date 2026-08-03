import dotenv from 'dotenv';
import app from './src/app.js';
import prisma from './src/config/db.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() { 
    try {
        // verify db connection 
        await prisma.$connect();
        console.log('Connected to database successfully');

        // start server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch(error) {
        console.error('Failed to start server: ', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

startServer();
