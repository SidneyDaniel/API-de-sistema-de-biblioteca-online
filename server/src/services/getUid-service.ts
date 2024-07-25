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

class UserSession {
  private req: Request;

  constructor(req: Request) {
      this.req = req;
  }

  private getSessionValue(): string {
      const cookieHeader = this.req.headers.cookie || '';
      const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
      const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
      return sessionCookie ? sessionCookie.split('=')[1] : '';
  }

  public getUserInfo(): Promise<{ uid: string, displayName: string, email: string, photoURL: string }> {
      return new Promise((resolve, reject) => {
          const sessionValue = this.getSessionValue();

          admin.auth()
              .verifySessionCookie(sessionValue, true)
              .then((decodedClaims) => {
                  admin.auth().getUserByEmail(decodedClaims?.email || '')
                      .then((userRecord) => {
                          resolve({
                              uid: userRecord.uid,
                              displayName: userRecord?.displayName || '',
                              email: userRecord?.email || '',
                              photoURL: userRecord?.photoURL || ''
                          });
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
}

export default UserSession;




// public updateUserEmail(newEmail: string): Promise<void> {
//   return new Promise((resolve, reject) => {
//       this.getUserInfo().then(userInfo => {
//           admin.auth().updateUser(userInfo.uid, { email: newEmail })
//               .then(() => resolve())
//               .catch(error => reject(error));
//       }).catch(error => reject(error));
//   });
// }

// public checkUserPermissions(): Promise<boolean> {
//   return new Promise((resolve, reject) => {
//       this.getUserInfo().then(userInfo => {
//           // Lógica para verificar permissões do usuário
//           const hasPermission = true; // Exemplo
//           resolve(hasPermission);
//       }).catch(error => reject(error));
//   });
// }