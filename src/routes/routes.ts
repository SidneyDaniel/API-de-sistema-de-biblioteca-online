import express from 'express';
export const router = express.Router();

//> SESSION
import sign__In from '../routes/routes-session/Sign_In';
import sign__Out from '../routes/routes-session/Sign_Out';
// const sign__Up  = require('../routes/session/Sign_Up.js')

// const verifiy__Session = require('../routes/session/VerifiySession.js')
// // const getUidFrom__Session = require('../routes/session/getUidFromSession.js')

// //>ACESS-CODE
import getAcessCode from '../routes/routes-accesCode/get-AccesCode';
import getClassCode from '../routes/routes-accesCode/get-ClassCode'; 
import getSavedCode from '../routes/routes-accesCode/get-SavedCode';

// //Admin FireStoreRoutes 
// // > CRUD
import createBook from '../routes/routes-adminFireStore/CRUD/create-Book';
import readBook from '../routes/routes-adminFireStore/CRUD/read-Book';
import removeBook from '../routes/routes-adminFireStore/CRUD/remove-Book';
import updateBook from '../routes/routes-adminFireStore/CRUD/update-Book';

// // *Registered Books
import checkLastBook from '../routes/routes-adminFireStore/check-lastRegisteredBook';
import registeredBooks from '../routes/routes-adminFireStore/registered-Books';

// // > FavBooks
// const addFavBook    = require('../routes/FavBooks/addFavBook.js')
// const getFavBook    = require('../routes/FavBooks/getFavBook.js')
// const removeFavBook = require('../routes/FavBooks/removeFavBook.js')


// // >UserRouter
// const delUser       = require('../routes/UserRoutes/DeleteUser.js')
// const editUser      = require('../routes/UserRoutes/EditUserData.js')
// const editAdminUser = require('../routes/UserRoutes/EditUserDataAdmin.js')
import listAllUser from '../routes/routes-user/list-AllUsers';
import userData from '../routes/routes-user/user-Data';


router.use('/', 
    sign__In,
    sign__Out,
    // sign__Up,
    // verifiy__Session,
    getAcessCode,
    getClassCode,
    getSavedCode,
    createBook,
    readBook,
    removeBook,
    updateBook,
    checkLastBook,
    registeredBooks,
    // addFavBook,
    // getFavBook,
    // removeFavBook,
    // delUser,
    // editUser,
    // editAdminUser,
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