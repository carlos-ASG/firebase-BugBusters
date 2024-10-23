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
  return tasks;
}

function createTask(title, description) {
  const newTask = {
    id: newID(),
    title,
    description,
  };
  tasks.push(newTask);
  return newTask;
}

function getTaskById(id) {
  id = parseInt(id);
  const taskFound = tasks.find((task) => {
    task.id === id;
  });
  //console.log(taskFound);
  return taskFound;
}

function updateTask(taskToUpdated) {
  taskToUpdated.id = parseInt(taskToUpdated.id);
  tasks = tasks.map((t) => (t.id === taskToUpdated.id ? taskToUpdated : t));
  return taskToUpdated;
}

function deleteTask(id) {
  const _id = parseInt(id);
  const taskToDelete = getTaskById(_id);
  console.log("task to delete: " + taskToDelete);
  tasks = tasks.filter((task) => task.id !== _id);
  return taskToDelete;
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
