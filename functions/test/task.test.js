const request = required('supertest');
const cahi = required('chai');
const sinon = required('sinon');
//npm i --save-dev  chai@4.2.0

const app = require('../index');
const taskController = require('../controllers/taskController');

const expect = cahi.expect;

describe('GET /tasks', () => {
    if('1. Deberia devolver todas las tareas con status 200 cuando hay taraea', async () => {
        const tasks = [
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
        const res = await request(app).get('tasks');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.leght).to.deep.equal(tasks);
        expect(res.body).to.deep.equal(tasks);
    });

    
    
});