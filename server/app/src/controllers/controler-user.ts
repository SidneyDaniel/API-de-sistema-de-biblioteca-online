import admin from 'firebase-admin';
import UserSession from '@src/services/getUid-service';
import { Request, Response } from "express";
import { UidIdentifier } from 'firebase-admin/lib/auth/identifier';

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
    const { newUserName, newUserEmail, userIdentifier } = req.body;

    try {
      // const getUIDentifier = async (nextPageToken?: string): Promise<UidIdentifier> => {
      //   const getUser= (await admin.auth().listUsers(1000, nextPageToken))
      //     .users
      //     .find(user => user.displayName === currentName)

      //   if (!getUser) {
      //     throw new Error(`User with displayName "${currentName}" not found.`)
      //   }

      //   return {uid: getUser?.uid}
      // } 

      const getUserName = async (nextPageToken?: string) => {
        const getUser = (await admin.auth().listUsers(1000, nextPageToken))
          .users
          .find(user => user.uid === userIdentifier)?.displayName

        if (!getUser) {
          throw new Error(`User with displayName "${getUser}" not found.`)
        }

        return getUser
      } 

      const identifier: UidIdentifier = {
        uid: userIdentifier
      }
      console.log(identifier.uid)
      const response = await admin.auth().updateUser(identifier.uid.trim(),{
        displayName: newUserName,
        email: newUserEmail
      })

      if (!response) {
        throw new Error(`Something went wrong when updating user "${getUserName}". Please try again!`);
      }

      res.status(200).json({
        success: true,
        message: `User "${newUserName}" updated successfully.`,
        user: {
          uid: response.uid,
          displayName: response.displayName,
          email: response.email,
        },
      });
      
    } catch (error) {
      const errorHandler = error as Error

      const message = errorHandler.message || 'An unexpected error occurred. Please try again later.';
  
      console.error(error);
  
      res.status(400).json({
        success: false,
        message,
      });
    }
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
    const { userIdentifier } = req.body;

    try {

      const identifier: UidIdentifier = {
        uid: userIdentifier.trim()
      }
      
      await admin.auth().deleteUser(identifier.uid || '')

      res.status(204).json({
        success: true,
        message: `User with the UID"${userIdentifier}" deleted successfully.`,
      });
            
    } catch (error) {
      const errorHandler = error as Error

      const message = errorHandler.message || 'An unexpected error occurred. Please try again later.';
  
      console.error(error);
  
      res.status(400).json({
        success: false,
        message,
      });
    }
  }
};

export default UserController;