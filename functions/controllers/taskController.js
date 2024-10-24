const service = require('../db/service')

let tasks = [
  {
    id: 1,
    title: "Tarea 1",
    description: "Descripción de la Tarea 1",
  },
  {
    id: 2,
    title: "Tarea 2",
    description: "Descripción de la Tarea 2",
  },
  {
    id: 3,
    title: "Tarea 3",
    description: "Descripción de la Tarea 3",
  },
];
function getAllTasks() {
  return service.getAllTasks();
}

function createTask(title, description,completed,createdAt) {
  return service.createTask(title, description,completed,createdAt);
}

function getTaskById(id) {
  return service.getTaskById(id);
}

function updateTask(id,updatedData) {
  return service.updateTask(id,updatedData);
}

function deleteTask(id) {
  return service.deteleTask(id);
}

function newID() {
  const maxID = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
  return maxID + 1;
}

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
};
