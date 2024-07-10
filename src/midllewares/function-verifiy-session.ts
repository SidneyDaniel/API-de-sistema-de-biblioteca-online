// import admin from 'firebase-admin';
// import { Request, Response , NextFunction} from 'express';
// import decodedClaims from '@src/interfaces/interface-decodedClaims';

// function verificar(req: Request, res: Response, next: NextFunction) {
//     const cookieHeader = req.headers.cookie || '';
//     const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
//     const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
//     const sessionValue = sessionCookie ? sessionCookie.split('=')[1] : '';
  
//     admin.auth()
//       .verifySessionCookie(sessionValue, true)
//       .then((decodedClaims: decodedClaims) => {
//         admin.auth().getUserByEmail(decodedClaims.email)
//         .then(userRecord => {
//           const displayNames = userRecord.displayName;
//           console.log(`O nome de exibição do usuário é: ${displayNames}`);
          
//         })
//         .catch(error => {
//           console.error('Erro ao recuperar as informações do usuário:', error);
//         });
  
//         next()
//         console.log("autorizado a entrada");
//       })
//       .catch((error) => {
//         console.log("Não autorizado" + `${error.message}`);
//         res.redirect('/pagina_de_login/login.html');
        
//       });
// }

// function verificarAdm(req:Request, res:Response, next:NextFunction) {
// const cookieHeader = req.headers.cookie || '';
// const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
// const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
// const sessionValue = sessionCookie ? sessionCookie.split('=')[1] : '';

// admin.auth()
//     .verifySessionCookie(sessionValue, true)
//     .then((decodedClaims) => {
//     admin.auth().getUserByEmail(decodedClaims.email)
//     .then(userRecord => {
//         console.log(userRecord.customClaims.role);
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
// }

// module.exports = {verificar, verificarAdm}