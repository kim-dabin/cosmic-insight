import express from 'express';
import nasaRoutes from './routes/nasaRoutes.js';
import 'dotenv/config'
import cors from 'cors';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log(path.resolve(__dirname, '.env'));

// dotenv.config({ path: path.resolve(__dirname, '.env') }); // 환경변수 로드

const app = express();
app.use(cors());

app.use('/api/nasa', nasaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));