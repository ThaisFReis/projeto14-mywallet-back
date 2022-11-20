import express, { json } from 'express';
import cors from 'cors';

// Server
const app = express();
app.use(cors());
app.use(json());

// Router
// import router from './routes/index.js';
// app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});