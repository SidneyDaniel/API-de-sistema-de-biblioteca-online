const admin = require('firebase-admin');
const { sign } = require('crypto');

// admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: process.env.PROJECT_ID,
//       clientEmail: '',
//       privateKey: ''
//     }),
//     databaseURL: ''
     
// });

admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY,
    }),
    databaseURL: process.env.DATABASE_URL,
  });
  


const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const db = getFirestore();

module.exports = {
  db
}