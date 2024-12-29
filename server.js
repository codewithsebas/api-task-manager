import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { setupSwagger } from './config/swagger.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Configuración de Swagger
setupSwagger(app);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {});
