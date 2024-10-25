const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController'); // Asegúrate de que esta línea sea correcta

const router = express.Router();

// Rutas para la autenticación
router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser); // Asegúrate de que sea POST

// Ejemplo de una ruta protegida
router.get('/task', verifyToken, (req, res) => {
    res.json({ message: 'Ruta protegida accedida con éxito' });
});

module.exports = router;
