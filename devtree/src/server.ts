import express from 'express';  // ESM Ecmascript Module syntax
import 'dotenv/config';
import router from './router';
import {connectDB} from './config/db';

const app = express();

connectDB();

// Read data form formularys as JSON
app.use(express.json());

app.use('/api', router);

export default app;