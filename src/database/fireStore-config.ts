import admin from 'firebase-admin';
// import { sign } from 'crypto';


admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECT_ID,
      clientEmail: process.env.CLIENT_EMAIL,
      privateKey: process.env.PRIVATE_KEY,
    }),
    databaseURL: process.env.DATABASE_URL,
  });
  


import { getFirestore } from 'firebase-admin/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const db = getFirestore();

// module.exports = {
//   db
// }

export default db