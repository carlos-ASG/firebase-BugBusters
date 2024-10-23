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

module.exports = {
    getAllTasks
}