import { Request } from "express";
import admin from 'firebase-admin';

export function getUIDFromSession(req: Request): Promise<string> {
    return new Promise((resolve, reject) => {
      const cookieHeader = req.headers.cookie || '';
      const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
      const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
      const sessionValue = sessionCookie ? sessionCookie.split('=')[1] : '';
  
      admin.auth()
        .verifySessionCookie(sessionValue, true)
        .then((decodedClaims) => {
          admin.auth().getUserByEmail(decodedClaims?.email || '')
          .then((userRecord) => {
            resolve(userRecord.uid);
          })
          .catch(error => {
            console.error('Erro ao recuperar as informações do usuário:', error);
            reject(error);
          });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
}

