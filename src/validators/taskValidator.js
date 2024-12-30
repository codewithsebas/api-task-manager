import { body, param, query } from 'express-validator';

// Validaciones para crear tarea
export const validateCreateTask = [
  body('title').notEmpty().withMessage('El título es obligatorio'),
  body('status').isIn(['pending', 'completed']).optional().withMessage('Estado inválido, debe ser "pending" o "completed"'),
  body('description').optional().isString().withMessage('Descripción debe ser un texto'),
];

// Validaciones para actualizar tarea
export const validateUpdateTask = [
  body('title').optional().notEmpty().withMessage('El título no puede estar vacío'),
  body('status').optional().isIn(['pending', 'completed']).withMessage('Estado inválido, debe ser "pending" o "completed"'),
  body('description').optional().isString().withMessage('Descripción debe ser un texto'),
];

// Validaciones para obtener tarea por ID
export const validateTaskId = [
  param('id').isMongoId().withMessage('ID inválido'),
];

// Validaciones para obtener todas las tareas con filtro de estado
export const validateStatusQuery = [
    query('status')
      .optional()  // El parámetro es opcional
      .isIn(['pending', 'completed'])  // Solo permite "pending" o "completed"
      .withMessage('Estado inválido, debe ser "pending" o "completed"'), // Mensaje de error
  ];