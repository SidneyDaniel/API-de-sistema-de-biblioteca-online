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

        async editarUsuariosAdm(req: Request, res: Response){
          const { newUserName, newUserEmail, currentName } = req.body;
    
          const listAllUsers = async (nextPageToken?: string) => {
          await admin.auth()
          .listUsers(1000, nextPageToken)
          .then((listUsersResult) => {
        
            const user = listUsersResult.users.find(user => user.displayName === currentName);
            console.log(user?.uid);
            
            //Deletar usuário Cadastrado
            admin.auth().updateUser(user?.uid || '', {
              displayName: newUserName,
              email: newUserEmail
              
            })
            .then((userRecord) => {
              console.log('Successfully updated user:', userRecord.uid);
              
              res.json({
                name: userRecord.displayName,
                message: "Atualizado com sucesso!!!!!"
              });
              
            })
            .catch((error) => {
              console.error('Error updating user:', error);
            });
          
        
          })
          .catch((error) => {
            console.log('Error', error);
            res.json(error)
          });
        }
         await listAllUsers();
         
        }

        async editarUsuario(req: Request, res: Response){
          const cookieHeader  = req.headers.cookie || '';
          const cookies       = cookieHeader.split(';').map(cookie => cookie.trim());
          const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
          const sessionValue  = sessionCookie ? sessionCookie.split('=')[1] : '';
        
          const { newPhoto,newName, newEmail } = req.body;
          
          admin.auth()
          .verifySessionCookie(sessionValue, true /** checkRevoked */)
          .then((decodedClaims) => {
            
            admin.auth().updateUser(decodedClaims.uid, {
              photoURL: newPhoto,
              displayName: newName,
              email: newEmail
              
            })
            .then((userRecord) => {
              console.log('Successfully updated user:', userRecord.uid);
              console.log(userRecord.displayName);
              console.log(userRecord.photoURL);
              
              res.json({
                photoURL: userRecord.photoURL,
                message: "Atualizado com sucesso!!!!!"
              });
              
            })
            .catch((error) => {
              console.error('Error updating user:', error);
            });
          
          })
        }

        async deletarUsuario(req: Request, res: Response){
          const { userName } = req.body;
          console.log(userName);
          // res.json(userName)
        
          const listAllUsers = async (nextPageToken?: string) => {
          // List batch of users, 1000 at a time.
          await admin.auth()
            .listUsers(1000, nextPageToken)
            .then((listUsersResult) => {
        
              const user = listUsersResult.users.find(user => user.displayName === userName);
        
              console.log(user?.uid);
              
              //Deletar usuário Cadastrado
              admin.auth()
              .deleteUser(user?.uid || '')
              .then(() => {
                console.log('Successfully deleted user');
                res.json("Successfully deleted user")
                
              })
              .catch((error) => {
                console.log('Error deleting user:', error);
                res.json({error})
              });
        
            })
            .catch((error) => {
              console.log('Error', error);
            });
          };
          // Start listing users from the beginning, 1000 at a time.
        
          await listAllUsers();
        }
};

export default UserController;