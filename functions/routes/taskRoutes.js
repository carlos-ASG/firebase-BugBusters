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

router.post('/', async (req, res)=> {
    const { title, description,completed,createdAt } = req.body;

    /*const title = req.body.title;
    const description = req.body.description;*/
    const newTask = await taskController.createTask(title, description,completed,createdAt);
    console.log(newTask)
    if(newTask.hasOwnProperty('message')){
        res.status(400).json(newTask)
    }else{
        res.status(200).json(newTask)
    }
    
});

router.get('/get', async (req, res)=> {
    const { id } = req.body;
    const task = await taskController.getTaskById(id);

    if(task != null)
        res.status(200).json(task.data());
    else
        res.status(404).json({code: 404, message: 'Task not found'});
});

router.put('/update', async (req, res) => {
    const {id, ...updatedData} = req.body;

    const taskUpdated = await taskController.updateTask(id,updatedData);
    if(taskUpdated['code'] == 200){
        res.status(200).json(taskUpdated);
    }else{
        res.status(400).json(taskUpdated);

    }
});

router.delete('/', async (req, res) => {
    const { id } = req.body;
    const message = await taskController.deleteTask(id);

    if(message['code'] == 200){
        res.status(200).json(message);
    }else{
        res.status(400).json(message);
    }
    
});

module.exports = router;