const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { verifyToken } = require('../middlewares/authMiddleware');  // Importar el middleware de autenticación

// Obtener todas las tareas (protegido)
router.get('/', verifyToken, async (req, res) => {
    try {
        const tasks = await taskController.getAllTasks();
        console.log(tasks);
        return res.status(200).json(tasks);
    } catch (error) {
        console.error('Error al obtener tareas:', error);
        return res.status(500).json({ message: "Error al obtener tareas" });
    }
});

// Crear una nueva tarea (protegido)
router.post('/', verifyToken, async (req, res) => {
    const { title, description, completed, createdAt } = req.body;

    console.log('Datos de la tarea:', req.body);

    try {
        // Llama al controlador para crear la tarea
        const newTask = await taskController.createTask(title, description, completed, createdAt);
        console.log("Resultado de Nueva tarea:", newTask);

        // Maneja la respuesta del controlador
        if (newTask.hasOwnProperty('message')) {
            return res.status(400).json(newTask);
        } else {
            return res.status(201).json(newTask);  // Cambiado a 201 para indicar creación exitosa
        }
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        return res.status(500).json({ message: 'Error al insertar los datos' });
    }
});

// Obtener tarea por ID (protegido)
router.get('/get', verifyToken, async (req, res) => {
    const { id } = req.body;
    try {
        const task = await taskController.getTaskById(id);
        if (task) {
            res.status(200).json(task.data());
        } else {
            res.status(404).json({ code: 404, message: 'Task not found' });
        }
    } catch (error) {
        console.error('Error al obtener tarea:', error);
        res.status(500).json({ message: 'Error al obtener la tarea' });
    }
});

// Actualizar tarea (protegido)
router.put('/update', verifyToken, async (req, res) => {
    const { id, ...updatedData } = req.body;

    try {
        const taskUpdated = await taskController.updateTask(id, updatedData);
        if (taskUpdated['code'] === 200) {
            res.status(200).json(taskUpdated);
        } else {
            res.status(400).json(taskUpdated);
        }
    } catch (error) {
        console.error('Error al actualizar la tarea:', error);
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
});

// Eliminar tarea (protegido)
router.delete('/', verifyToken, async (req, res) => {
    const { id } = req.body;

    try {
        const message = await taskController.deleteTask(id);
        if (message['code'] === 200) {
            res.status(200).json(message);
        } else {
            res.status(400).json(message);
        }
    } catch (error) {
        console.error('Error al eliminar la tarea:', error);
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
});

module.exports = router;
