import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/taskController.js';
import {
    validateCreateTask,
    validateUpdateTask,
    validateTaskId,
    validateStatusQuery
} from '../validators/taskValidator.js';
import { validationResult } from 'express-validator';

const router = express.Router();

// Middleware para manejar errores de validación
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Ruta para crear tarea
router.post('/', validateCreateTask, handleValidationErrors, createTask);

// Ruta para obtener todas las tareas con filtro de estado opcional
router.get('/', validateStatusQuery, handleValidationErrors, getTasks);

// Ruta para obtener tarea por ID
router.get('/:id', validateTaskId, handleValidationErrors, getTaskById);

// Ruta para actualizar tarea por ID
router.put('/:id', [
    validateTaskId,
    ...validateUpdateTask
], handleValidationErrors, updateTask);

// Ruta para eliminar tarea por ID
router.delete('/:id', validateTaskId, handleValidationErrors, deleteTask);

export default router;

