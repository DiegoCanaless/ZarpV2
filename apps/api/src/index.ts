import express from 'express';
import cors from 'cors';
import { createServer } from 'http';

const app = express();
const server = createServer(app);

// Middleware
app.use(cors({ origin: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000' }));
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// TODO: Agregar rutas acá

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
