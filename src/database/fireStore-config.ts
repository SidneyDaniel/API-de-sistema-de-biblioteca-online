import admin from 'firebase-admin';
// import { sign } from 'crypto';
import dotenv from 'dotenv'; 
dotenv.config()


admin.initializeApp({
    credential: admin.credential.cert({
      projectId:  process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,    
  });
  


import { getFirestore } from 'firebase-admin/firestore';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const db = getFirestore();

// module.exports = {
//   db
// }

export default db