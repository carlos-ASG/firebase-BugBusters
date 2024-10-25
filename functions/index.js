const express = require('express');
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const taskRouters = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());  // Para manejar las solicitudes JSON

app.use('/task', taskRouters);
app.use('/auth', authRoutes);

exports.app = functions.https.onRequest(app);
