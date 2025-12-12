import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDb from './lib/db.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import profileRoutes from './routes/profileRoutes.js';

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/notes', noteRoutes);

app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

const port = process.env.PORT || 5000;
connectDb()
  .then(() => app.listen(port, () => console.log(`API running on ${port}`)))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

