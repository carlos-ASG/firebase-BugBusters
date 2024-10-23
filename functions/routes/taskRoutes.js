const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController')


router.get('/', async (req, res)=> {
    try{
        const tasks = await taskController.getAllTasks();

        console.log(tasks)

        return res.status(200).json(tasks);
    }catch{
        return res.status(500).json({message: "error"});
    }
});

router.post('/', (req, res)=> {
    const { title, description } = req.body;

    /*const title = req.body.title;
    const description = req.body.description;*/
    const newTask = taskController.createTask(title, description);
    res.status(200).json(newTask);

});

router.get('/:id', (req, res)=> {
    const { id } = req.params;
    const task = taskController.getTaskById(id);
    console.log(task);
    if(task.leng)
        res.status(200).json(task);
    else
        res.status(404).json({code: 404, message: 'Task not found'});
});

router.put('/', (req, res) => {
    const taskUpdated = taskController.updateTask(req.body);
    res.status(201).json(taskUpdated);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const taskDeleted = taskController.deleteTask(id);
    res.status(200).json(taskDeleted);
});

module.exports = router;