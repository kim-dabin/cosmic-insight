import express from 'express';
import nasaRoutes from './routes/nasaRoutes.js';
import cors from 'cors';
import { connectDB } from './config/db.js';
// 환경변수 로드
import 'dotenv/config'

connectDB().catch(console.dir);

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/nasa', nasaRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));