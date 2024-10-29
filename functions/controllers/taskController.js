const service = require('../db/service')
const db = require('../db/db');


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

const createTask = async (title, description, completed, createdAt) => {
  try {
      const newTask = {
          title,
          description,
          completed,
          createdAt,
      };

      // Inserta la tarea en Firestore
      const docRef = await db.collection('Tasks').add(newTask);
      console.log('Tarea insertada con ID:', docRef.id);
      
      // Devuelve la tarea creada, incluyendo su ID
      return {
          id: docRef.id,
          ...newTask,
      };
  } catch (error) {
      console.error('Error al insertar la tarea:', error);
      return { message: 'Error al insertar los datos' }; // Esto se devolverá si hay un error
  }
};

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
