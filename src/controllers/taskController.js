import Task from '../models/taskModel.js';
import { validationResult } from 'express-validator';

// Función para crear tarea
export const createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
};

// Función para obtener todas las tareas con filtro de estado opcional
export const getTasks = async (req, res) => {
    const { status } = req.query;
    try {
      const filter = status ? { status } : {};
      const tasks = await Task.find(filter);
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener las tareas' });
    }
  };

// Función para obtener una tarea específica por ID
export const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
};

// Función para actualizar una tarea por ID
export const updateTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
};

// Función para eliminar una tarea por ID
export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.status(200).json({ message: 'Tarea eliminada con éxito' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};
