import express from 'express';
export const router = express.Router();

//> SESSION
import sign__In from './routes-session/Sign_In';
import sign__Out from './routes-session/Sign_Out';
import sign__Up from './routes-session/Sign_Up';

import verifiy__Session from './routes-session/verify_session';
// // const getUidFrom__Session = require('../routes/session/getUidFromSession.js')

// //>ACESS-CODE
import getAcessCode from './routes-accesCode/get-AccesCode';
import getClassCode from './routes-accesCode/get-ClassCode'; 
import getSavedCode from './routes-accesCode/get-SavedCode';

// //Admin FireStoreRoutes 
// // > CRUD
import createBook from './routes-adminFireStore/CRUD/create-Book';
import readBook from './routes-adminFireStore/CRUD/read-Book';
import removeBook from './routes-adminFireStore/CRUD/remove-Book';
import updateBook from './routes-adminFireStore/CRUD/update-Book';
import deleteBookBatch from './routes-adminFireStore/CRUD/delete-book-batch'

// // *Registered Books
import checkLastBook from './routes-adminFireStore/check-lastRegisteredBook';
import registeredBooks from './routes-adminFireStore/registered-Books';

// // > FavBooks
import addFavBook from './routes-favBooks/add-FavBook';
import getFavBook from './routes-favBooks/get-FavBook';
import removeFavBook from './routes-favBooks/remove-FavBook';


// // >UserRouter
import delUser from './routes-user/delete-User';
import editUser from './routes-user/edit-UserData';
import editAdminUser from './routes-user/edit-UserDataAdmin';
import listAllUser from './routes-user/list-AllUsers';
import userData from './routes-user/user-Data';


router.use('/', 
    sign__In,
    sign__Out,
    sign__Up,
    verifiy__Session,
    getAcessCode,
    getClassCode,
    getSavedCode,
    createBook,
    readBook,
    removeBook,
    updateBook,
    deleteBookBatch,
    checkLastBook,
    registeredBooks,
    addFavBook,
    getFavBook,
    removeFavBook,
    delUser,
    editUser,
    editAdminUser,
    listAllUser,
    userData 
);


export default router;

// import { Router } from 'express';
// class Routes {
//     static define(router: Router): Router {
//         router.use('/', 
//             sign__In,
//             sign__Out,
//             sign__Up,
//             verifiy__Session,
//             getAcessCode,
//             getClassCode,
//             getSavedCode,
//             createBook,
//             readBook,
//             removeBook,
//             updateBook,
//             checkLastBook,
//             registeredBooks,
//             addFavBook,
//             getFavBook,
//             removeFavBook,
//             delUser,
//             editUser,
//             editAdminUser,
//             listAllUser,
//             userData 
//         );

//         return router
         
//     }
// }

// export default Routes.define(Router())