import express from 'express';
const router = express.Router();
import admin from 'firebase-admin';
import { Response, Request } from 'express';


router.post('/login', (req: Request, res: Response) => {
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
        
      });;
})

router.post('/login/adm', (req: Request, res: Response) => {
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
    });

export default router