import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './src/config/db.js';
import { setupSwagger } from './src/config/swagger.js';
import taskRoutes from './src/routes/taskRoutes.js';

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

connectDB();
setupSwagger(app);

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});

// Exporta `app` y `server` por separado
export { app, server };
