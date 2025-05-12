import admin from 'firebase-admin';
import { Request, Response , NextFunction} from 'express';
// import decodedClaims from '@src/interfaces/interface-decodedClaims';

async function verificar(req: Request, res: Response, next: NextFunction):Promise<void> {
    const cookieHeader = req.headers.cookie || '';
    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
    const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
    const sessionValue = sessionCookie ? sessionCookie.split('=')[1] : '';

    try {
      const decodedClaims = await admin.auth().verifySessionCookie(sessionValue, true)
      const userRecord = await admin.auth().getUserByEmail(decodedClaims?.email || '')

      const displayNames = userRecord.displayName
      console.log('\x1b[36m%s\x1b[0m',`The user connected is: ${displayNames}`);
      
      next()
    } catch (error) {
      res.status(301).send((error as Error).message).redirect('/pagina_de_login/login.html');
    }

    // admin.auth()
    //   .verifySessionCookie(sessionValue, true)
    //   .then((decodedClaims) => {
    //     admin.auth().getUserByEmail(decodedClaims?.email || '')
    //     .then(userRecord => {
    //       const displayNames = userRecord.displayName;
    //       console.log(`O nome de exibição do usuário é: ${displayNames}`);
          
    //     })
    //     .catch(error => {
    //       console.error('Erro ao recuperar as informações do usuário:', error);
    //     });
  
    //     next()
    //     console.log("autorizado a entrada");
    //   })
    //   .catch((error) => {
    //     console.log("Não autorizado" + `${error.message}`);
    //     res.redirect('/pagina_de_login/login.html');
        
    //   });
}

async function verifyAdm(req:Request, res:Response, next:NextFunction): Promise<void> {
    const cookieHeader = req.headers.cookie || '';
    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
    const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
    const sessionValue = sessionCookie ? sessionCookie.split('=')[1] : '';

    try {
      const decodedClaims = await admin.auth().verifySessionCookie(sessionValue, true)
      const userRecord = await admin.auth().getUserByEmail(decodedClaims?.email || '')

      if (userRecord.customClaims && userRecord.customClaims.role === "admin") {
        console.warn('The user is an Admin');
        // res.status(200).json("Authorized");
        next();
      } else {
        console.warn('The user is not an Admin');
        res.status(301).redirect('/pagina_de_login/loginADM.html');
      }

    } catch (error) {
      console.warn("Não autorizado" + `${(error as Error).message}`);
      res.status(301).send((error as Error).message).redirect('/pagina_de_login/loginADM.html');
    }

    // admin.auth()
    //     .verifySessionCookie(sessionValue, true)
    //     .then((decodedClaims) => {
    //     admin.auth().getUserByEmail(decodedClaims?.email || '')
    //     .then(userRecord => {
    //         console.log(userRecord.customClaims?.role); 
    //         if (userRecord.customClaims && userRecord.customClaims.role === "admin") {
    //         console.log('O usuário é um administrador');
    //         // res.json("Autorizado");
    //         next();
    //         } else {
    //         console.log('O usuário não é um administrador');
    //         res.redirect('/pagina_de_login/loginADM.html');
    //         }
    //     })
    //     .catch(error => {
    //         console.error('Erro ao recuperar as informações do usuário:', error);
    //     });
    //     })
    //     .catch((error) => {
    //     console.log("Não autorizado" + `${error.message}`);
    //     res.redirect('/pagina_de_login/loginADM.html');
    //     });
}

export default { verificar, verifyAdm }