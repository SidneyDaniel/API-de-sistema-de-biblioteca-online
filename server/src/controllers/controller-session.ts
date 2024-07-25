import admin from 'firebase-admin';
import { Response, Request } from 'express';
import crypto from 'crypto';


class SessionController {
    async login(req: Request, res: Response){
        const { idToken } = req.body;

        const expiresIn = 60 * 60 * 24 * 5 * 1000;
        admin.auth().createSessionCookie(idToken, {expiresIn})
        .then((sessionCookie) => {
            const options = {maxAge: expiresIn, httpOnly: true, secure: true};

            res.cookie('session', sessionCookie, options);
            res.redirect('/Usuario/pagina_de_livros/página_livros.html');
        }).catch(error => {
            console.error(error);
            res.json({ error: error.message });
            
        })
    }

    async loginAdm(req: Request, res: Response){
        const { idToken } = req.body;
        
        const expiresIn = 60 * 60 * 24 * 5 * 1000; 
        admin.auth().createSessionCookie(idToken, {expiresIn})
            .then((sessionCookie) => {
            const options = {maxAge: expiresIn, httpOnly: true, secure: true};
            res.cookie('session', sessionCookie, options);
            res.redirect('/admnistracao/dashboard/dashboard.html');
            }).catch(error => {
            console.error(error);
            res.json({ error: error.message });
            
            });;
    };

    async signOut(req: Request, res: Response){
        const cookieHeader = req.headers.cookie || '';
        const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
        // console.log(cookies);
        const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
        // console.log(sessionCookie);
        const sessionValue = sessionCookie ? sessionCookie.split('=')[1] : '';
        res.clearCookie('session');
        admin.auth()
          .verifySessionCookie(sessionValue)
          .then((decodedClaims) => {
            console.log(decodedClaims.sub);
            decodedClaims.getIdToken(/*forceRefresh*/ true)
            return admin.auth().revokeRefreshTokens(decodedClaims.sub);
            
          })
          .then(() => {
            return res.redirect('index.html');
          })
          .catch((error) => {
            res.json({ error: error.message});
          });
    }

    async signUp(req: Request, res: Response){
      const { displayName, email, password } = req.body;
      admin.auth().createUser({
        displayName,
        email,
        password
      })
        .then(userRecord => {
          admin.auth().setCustomUserClaims(userRecord.uid, { role: 'user' })
            .then(() => {
              res.json({ message: 'Usuário cadastrado com sucesso!' });
            });

          const db = admin.firestore();

          const uid = userRecord.uid;
          const userDoc = db.collection('usuarios').doc(uid).collection('turmas').doc('turma');

          userDoc.set({
            nome: userRecord.displayName,
            email: userRecord.email,
          })
            .then(() => {
              console.log('Documento criado com sucesso!');
            })
            .catch(error => {
              console.error('Erro ao criar o documento: ', error);
            });

        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ error: error.message });

        });
    }

    async signUpAdm(req: Request, res: Response){
      const { displayName, email, password } = req.body;
      console.log(email, displayName, password);
      // Criar um usuário com o Firebase Admin SDK
      admin.auth().createUser({
          displayName,
          email,
          password
      })
      .then(userRecord => {
          admin.auth().setCustomUserClaims(userRecord.uid, { role: 'admin' })
          .then(() => {
          res.json({ message: 'Usuário cadastrado com sucesso!' });
          });
    
          const db = admin.firestore();
    
          const uid = userRecord.uid; 
          const adminDoc = db.collection('administradores').doc(uid).collection('livrosAdm').doc('accessCode');
          
          const cryptos = crypto;
          const uniqueString = userRecord.email; 
          const accessCode = cryptos.createHash('sha256').update(uniqueString || '').digest('hex');
          console.log(accessCode);
    
          adminDoc.set({accessCode: accessCode}).then(() => {
              console.log('Código de acesso definido com sucesso!');
          });
    
      })
      .catch(error => {
          console.error(error);
          res.status(500).json({ error: error.message });
          
      });
    }

}

export default SessionController;