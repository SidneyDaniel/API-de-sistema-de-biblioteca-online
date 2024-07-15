import admin from 'firebase-admin';
import { Request, Response } from "express";

class UserController { 
    async dadosUsuario(req: Request, res: Response){
        const cookieHeader  = req.headers.cookie || '';
        const cookies       = cookieHeader.split(';').map(cookie => cookie.trim());
        const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
        const sessionValue  = sessionCookie ? sessionCookie.split('=')[1] : '';
      
        admin.auth()
          .verifySessionCookie(sessionValue, true /** checkRevoked */)
          .then((decodedClaims) => {
           admin.auth().getUserByEmail(decodedClaims?.email || '')
            .then(userRecord => {
              // O nome de exibição do usuário está disponível na propriedade displayName
              const photo = userRecord.photoURL;
              const displayNames = userRecord.displayName;
              const email = userRecord.email;
      
              console.log(`O nome de exibição do usuário é: ${displayNames}`);
              // res.json(displayNames)
              res.json({ photoURL: photo, displayName: displayNames, email: email })
            })
            .catch(error => {
              console.error('Erro ao recuperar as informações do usuário:', error);
            });      
          })
          .catch((error) => {
            // Session cookie is unavailable or invalid. Force user to login.
            res.status(error.message)
            
          });
    }

    async listarUsarios(req: Request, res: Response){
        let allUsers: Array<object> = [];
    
        const listAllUsers = async (nextPageToken?: string) => {
        // List batch of users, 1000 at a time.
        await admin.auth()
            .listUsers(1000, nextPageToken)
            .then((listUsersResult) => {
            const users = listUsersResult.users.map((user) => ({
                displayName: user.displayName,
                email: user.email,
            }));
            allUsers = allUsers.concat(users);
    
            if (listUsersResult.pageToken) {
                listAllUsers(listUsersResult.pageToken);
            } else {
                res.json({ users: allUsers });
            }
            })
            .catch((error) => {
            console.log('Error listing users:', error);
            res.status(error);;
            res.json(error.message);
            });
        };
        // Start listing users from the beginning, 1000 at a time.
        await listAllUsers();
        }
};

export default UserController;