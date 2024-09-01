import admin from 'firebase-admin';
import UserSession from '@src/services/getUid-service';
import { Request, Response } from "express";

class UserController { 
  async dadosUsuario(req: Request, res: Response) {
    const userSession = new UserSession(req);

    userSession.getUserInfo().then(async (userInfo) => {
      const photo = userInfo.photoURL;
      const displayNames = userInfo.displayName;
      const email = userInfo.email;

      console.log(`O nome de exibição do usuário é: ${displayNames}`);
      res.json({ photoURL: photo, displayName: displayNames, email: email })
    })
      .catch(error => {
        console.error('Erro ao recuperar as informações do usuário:', error);
      });
  }

  async listarUsarios(req: Request, res: Response) {
    let allUsers: Array<object> = [];

    const listAllUsers = async (nextPageToken?: string) => {
      // List batch of users, 1000 at a time.
      await admin.auth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
          // console.log(listUsersResult);
          
          const users = listUsersResult.users.map((user) => ({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
            tokensValidAfterTime: user.tokensValidAfterTime,
            disabled: user.disabled,
          }));
          allUsers = allUsers.concat(users);
          console.log(users);
          
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

  async editarUsuariosAdm(req: Request, res: Response) {
    const { newUserName, newUserEmail, currentName } = req.body;

    const listAllUsers = async (nextPageToken?: string) => {
      await admin.auth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {

          const user = listUsersResult.users.find(user => user.displayName === currentName);
          console.log(user?.uid);

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

  async editarUsuario(req: Request, res: Response) {
    const userSession = new UserSession(req);
    const { newPhoto, newName, newEmail } = req.body;

    userSession.getUserInfo().then(async (userInfo) => {
      admin.auth().updateUser(userInfo.uid, {
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
    });
  }

  async deletarUsuario(req: Request, res: Response) {
    const { userName } = req.body;
    console.log(userName);
    // res.json(userName)

    const listAllUsers = async (nextPageToken?: string) => {
      await admin.auth()
        .listUsers(1000, nextPageToken)
        .then((listUsersResult) => {

          const user = listUsersResult.users.find(user => user.displayName === userName);

          console.log(user?.uid);

          admin.auth()
            .deleteUser(user?.uid || '')
            .then(() => {
              console.log('Successfully deleted user');
              res.json("Successfully deleted user")

            })
            .catch((error) => {
              console.log('Error deleting user:', error);
              res.json({ error })
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