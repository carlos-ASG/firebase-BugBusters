const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db'); // Esto apunta a la carpeta 'db' y carga 'db.js'

const JWT_SECRET = 'tilinEsGrande69'; // Usa una clave secreta fuerte

// Controlador para registrar usuarios
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verifica si el usuario ya existe
        const existingUser = await db.collection('Users').where('username', '==', username).get();
        if (!existingUser.empty) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        // Encripta la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Guarda el nuevo usuario
        const newUser = { username, password: hashedPassword };
        await db.collection('Users').add(newUser);

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar el usuario' });
    }
};

// Controlador para el login
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Verifica si el usuario existe
        const userSnapshot = await db.collection('Users').where('username', '==', username).get();
        if (userSnapshot.empty) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrecta' });
        }

        const user = userSnapshot.docs[0].data();

        // Verifica la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrecta' });
        }

        // Genera el token JWT
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

module.exports = { registerUser, loginUser };
