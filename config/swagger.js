import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export const setupSwagger = (app) => {
  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Task Manager API',
        version: '1.0.0',
        description: 'API para gestionar tareas',
      },
      servers: [
        {
          url: process.env.API_URL || 'http://localhost:3000',
        },
      ],
    },
    apis: ['./routes/taskRoutes.js'], // Rutas que contienen la documentación
  };

  const swaggerSpec = swaggerJSDoc(swaggerOptions);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
