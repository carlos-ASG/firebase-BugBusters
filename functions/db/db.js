const admin = require('firebase-admin')

admin.initializeApp({
    credential: admin.credential.cert('./permissions.json')
});

const db = admin.firestore();

module.exports = db;