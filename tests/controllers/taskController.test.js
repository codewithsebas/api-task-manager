import supertest from "supertest";
import { server } from "../../server";
import mongoose from "mongoose";
import Task from "../../src/models/taskModel";

jest.mock("../../src/models/taskModel.js", () => {
    return {
        find: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        findByIdAndDelete: jest.fn(),
    };
});

// Crea una tarea y pega aca el _id y realiza npm run test:watch
const ID = '6772da28053629f18309b6e3';
const api = supertest(server);

describe('Task Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    });

    describe('GET /api/tasks', () => {
        it('debe retornar todas las tareas', async () => {
            const tasks = [
                { _id: ID, title: 'Tarea nueva', status: 'pending' },
            ];
            Task.find.mockResolvedValue(tasks);

            const response = await api.get('/api/tasks').expect(200).expect('Content-Type', /application\/json/);

            expect(Task.find).toHaveBeenCalledWith({});
            expect(response.body).toEqual(tasks);
        });

        it('debe filtrar tareas por estado', async () => {
            const tasks = [{ _id: ID, title: 'Tarea nueva', status: 'completed' }];
            Task.find.mockResolvedValue(tasks);

            const response = await api.get('/api/tasks?status=completed').expect(200);

            expect(Task.find).toHaveBeenCalledWith({ status: 'completed' });
            expect(response.body).toEqual(tasks);
        });
    });

    describe('GET /api/tasks/:id', () => {
        it('debe retornar una tarea por ID', async () => {
            const task = { _id: ID, title: 'Tarea nueva', status: 'pending' };
            Task.findById.mockResolvedValue(task);

            const response = await api.get(`/api/tasks/${ID}`).expect(200);  // Se usa la variable ID correctamente

            expect(Task.findById).toHaveBeenCalledWith(ID);
            expect(response.body).toEqual(task);
        });

        it('debe retornar 404 si la tarea no existe', async () => {
            Task.findById.mockResolvedValue(null);

            const response = await api.get(`/api/tasks/${ID}`).expect(404);  // Se usa la variable ID correctamente

            expect(response.body.error).toBe('Tarea no encontrada');
        });
    });

    describe('PUT /api/tasks/:id', () => {
        it('debe actualizar una tarea', async () => {
            const updatedTask = { _id: ID, title: 'Actualizar tarea', status: 'completed' };
            Task.findByIdAndUpdate.mockResolvedValue(updatedTask);

            const response = await api.put(`/api/tasks/${ID}`).send({ title: 'Actualizar tarea' }).expect(200);  // Se usa la variable ID correctamente

            expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
                ID,
                { title: 'Actualizar tarea' },
                { new: true }
            );
            expect(response.body).toEqual(updatedTask);
        });

        it('debe retornar 404 si la tarea no existe', async () => {
            Task.findByIdAndUpdate.mockResolvedValue(null);

            const response = await api.put(`/api/tasks/${ID}`).send({ title: 'Actualizar tarea' }).expect(404);  // Se usa la variable ID correctamente

            expect(response.body.error).toBe('Tarea no encontrada');
        });
    });

    describe('DELETE /api/tasks/:id', () => {
        it('debe eliminar una tarea', async () => {
            const deletedTask = { _id: ID, title: 'Tarea nueva', status: 'pending' };
            Task.findByIdAndDelete.mockResolvedValue(deletedTask);

            const response = await api.delete(`/api/tasks/${ID}`).expect(200);  // Se usa la variable ID correctamente

            expect(Task.findByIdAndDelete).toHaveBeenCalledWith(ID);
            expect(response.body.message).toBe('Tarea eliminada con éxito');
        });

        it('debe retornar 404 si la tarea no existe', async () => {
            Task.findByIdAndDelete.mockResolvedValue(null);

            const response = await api.delete(`/api/tasks/${ID}`).expect(404);  // Se usa la variable ID correctamente

            expect(response.body.error).toBe('Tarea no encontrada');
        });
    });
});
