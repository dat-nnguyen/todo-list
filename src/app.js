import express from 'express';

const app = express();

//middleware to parse incoming JSON body
app.use(express.json())

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running'
    });
});

export default app;