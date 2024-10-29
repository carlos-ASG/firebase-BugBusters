const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')

/**
 * @swagger
 * /task:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas obtenida con éxito
 *       500:
 *         description: Error en el servidor
 */
router.get('/', async (req, res)=> {
    try{
        const tasks = await taskController.getAllTasks();

        console.log(tasks)

        return res.status(200).json(tasks);
    }catch{
        return res.status(500).json({message: "error"});
    }
});

/**
 * @swagger
 * /task:
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
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Tarea creada con éxito
 *       400:
 *         description: Error al crear la tarea
 */
router.post('/', async (req, res)=> {
    const { title, description,completed,createdAt } = req.body;

    /*const title = req.body.title;
    const description = req.body.description;*/
    const newTask = await taskController.createTask(title, description,completed,createdAt);
    console.log(newTask)
    if(newTask.hasOwnProperty('message')){
        res.status(400).json(newTask)
    }else{
        res.status(201).json(newTask)
    }
    
});

/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Obtiene una tarea por su ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea obtenida con éxito
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const task = await taskController.getTaskById(id);

    if (task != null)
        res.status(200).json(task.data());
    else
        res.status(404).json({ code: 404, message: 'Task not found' });
});


/**
 * @swagger
 * /task/update:
 *   put:
 *     summary: Actualiza una tarea existente
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tarea actualizada con éxito
 *       400:
 *         description: Error al actualizar la tarea
 */
router.put('/update', async (req, res) => {
    const {id, ...updatedData} = req.body;

    const taskUpdated = await taskController.updateTask(id,updatedData);
    if(taskUpdated['code'] == 200){
        res.status(200).json(taskUpdated);
    }else{
        res.status(400).json(taskUpdated);

    }
});

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Elimina una tarea
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea a eliminar
 *     responses:
 *       200:
 *         description: Tarea eliminada con éxito
 *       400:
 *         description: Error al eliminar la tarea
 */
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Obtén el ID desde los parámetros de la URL
    const result = await taskController.deleteTask(id);

    if (result && result.message === 'Error al eliminar la tarea') {
        res.status(400).json(result);
    } else {
        res.status(200).json({ message: 'Tarea eliminada con éxito' });
    }
});

module.exports = router;