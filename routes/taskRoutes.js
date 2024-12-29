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

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operaciones relacionadas con las tareas
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título de la tarea (obligatorio)
 *               description:
 *                 type: string
 *                 description: La descripción de la tarea (opcional)
 *               status:
 *                 type: string
 *                 description: El estado de la tarea ("pending" o "completed")
 *                 enum: [pending, completed]
 *                 default: pending
 *     responses:
 *       201:
 *         description: Tarea creada con éxito
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         schema:
 *           type: string
 *           enum: [pending, completed]
 *         description: Filtro opcional para obtener tareas por estado
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la tarea
 *                   title:
 *                     type: string
 *                     description: Título de la tarea
 *                   description:
 *                     type: string
 *                     description: Descripción de la tarea
 *                   status:
 *                     type: string
 *                     description: Estado de la tarea ("pending" o "completed")
 *       400:
 *         description: Error de validación del parámetro "status"
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea específica por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a obtener
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la tarea
 *                 title:
 *                   type: string
 *                   description: Título de la tarea
 *                 description:
 *                   type: string
 *                   description: Descripción de la tarea
 *                 status:
 *                   type: string
 *                   description: Estado de la tarea ("pending" o "completed")
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea existente por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título de la tarea (opcional)
 *               description:
 *                 type: string
 *                 description: La descripción de la tarea (opcional)
 *               status:
 *                 type: string
 *                 description: El estado de la tarea ("pending" o "completed")
 *                 enum: [pending, completed]
 *     responses:
 *       200:
 *         description: Tarea actualizada con éxito
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea por ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tarea a eliminar
 *     responses:
 *       200:
 *         description: Tarea eliminada con éxito
 *       404:
 *         description: Tarea no encontrada
 *       500:
 *         description: Error en el servidor
 */
