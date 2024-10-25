const db = require('./db')

const getAllTasks = async () => {
    const query = db.collection('Tasks')
    const querySnapshot = await query.get()

    const docs = querySnapshot.docs;

    const tasks = docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        completed: doc.data().completed,
        createdAt: doc.data().createdAt
    }));

    return tasks;
}

const createTask = async (title, description,completed,createdAt) => {
    try{
        const docRef = await db.collection('Tasks').add({ title, description,completed,createdAt });
        console.log(docRef)
        return {
            id: docRef.id,
            description: docRef.data().description,
            completed: docRef.data().completed,
            createdAt: docRef.data().createdAt
        }
    }catch{
        return {
            message: 'Error al insertar los datos'
        };
    }
}

const getTaskById = async (id) => {
    try{
        const query = await db.collection('Tasks').doc(id).get();

        return query
    }catch{
        return null
    }
}

const updateTask = async (id,updatedData) => {
    console.log(id,updatedData)
    try{
        const task = await db
                        .collection('Tasks')
                        .doc(id)
                        .update(updatedData);
        

        return {
            code: 200,
            data: 'Actualizacion hecha con exito'
        }
    }catch{
        return {
            code: 400,
            message: 'Error al actualizar la tarea' + id
        } 
    }
}

const deteleTask = async (id) => {
    try{
        await db.collection('Tasks').doc(id).delete();
        return { 
            code: 200,
            message: 'Se ha eliminado con exito: ' + id
        }
    }catch{
        return { 
            code: 400,
            message: 'Error al eliminar la tarea'
        }
    }
}

module.exports = {
    getAllTasks,
    createTask,
    deteleTask,
    getTaskById,
    updateTask
}