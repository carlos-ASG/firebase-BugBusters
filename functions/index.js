const express = require('express');
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const taskRouters = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Tareas',
      version: '1.0.0',
      description: 'API para gestionar tareas\n'+
      'Alumnos:\n' +
      '- Christian Isabel López Cantabrana\n'+
      '- Carlos Alberto Sandoval Guardado\n'+
      '- José De Jesus Robles Perez\n'+
      '- Adolfo Ramirez Garcia\n'

    },
    components: {
      securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
          }
      }
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: 'http://localhost:5000/servicioswebu1/us-central1/app'
      }
    ]
  },
  apis: ['./routes/taskRoutes.js','./routes/authRoutes.js']
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/task',taskRouters);
app.get('/', (req, res) => {
    res.send('API de Tareas en funcionamiento. Visita /api-docs para la documentación.');
});
app.use(express.json());  // Para manejar las solicitudes JSON

app.use('/task', taskRouters);
app.use('/auth', authRoutes);

exports.app = functions.https.onRequest(app);
