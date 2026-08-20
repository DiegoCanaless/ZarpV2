import express, { type Express} from 'express';
import cors from 'cors';
import { createServer } from 'http';

import authRoutes from "./routes/auth.routes"

const app: Express = express();
const server = createServer(app);

// Middleware
const allowedOrigins = ["http://localhost:3000", process.env.CORS_ORIGIN].filter(Boolean) as string[];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());


app.use("/api/auth", authRoutes)


export default app

// TODO: Agregar rutas acá

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`🚀 API running on http://localhost:${PORT}`)
  });
}
