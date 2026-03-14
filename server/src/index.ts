import express from 'express';
import cors from 'cors';
import { config } from './config';
import geocodingRoutes from './routes/geocoding';
import weatherRoutes from './routes/weather';
import { errorHandler } from './utils/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/geocoding', geocodingRoutes);
app.use('/api/weather', weatherRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
