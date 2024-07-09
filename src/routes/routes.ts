import express from 'express';
export const router = express.Router();

//> SESSION
const sign__In  = require('../routes/routes-session/Sign_In.js')
const sign__Out = require('../routes/session/Sign_Out.js')
const sign__Up  = require('../routes/session/Sign_Up.js')

const verifiy__Session = require('../routes/session/VerifiySession.js')
// const getUidFrom__Session = require('../routes/session/getUidFromSession.js')

//>ACESS-CODE
const getAcessCode = require('../routes/AcessCode/getAcessCode.js')
const getClassCode = require('../routes/AcessCode/getClassCods.js') 
const getSavedCode = require('../routes/AcessCode/getSavedCode.js')

//Admin FireStoreRoutes 
// > CRUD
const createBook = require('../routes/AdminFireStoreRoutes/CRUD/createBook.js')
const readBook   = require('../routes/AdminFireStoreRoutes/CRUD/readBook.js')
const removeBook = require('../routes/AdminFireStoreRoutes/CRUD/removeBook.js')
const updateBook = require('../routes/AdminFireStoreRoutes/CRUD/updateBook.js')

// *Registered Books
const checkLastBook   = require('../routes/AdminFireStoreRoutes/checkLastRegisteredBook.js')
const registeredBooks = require('../routes/AdminFireStoreRoutes/registeredBooks.js')

// > FavBooks
const addFavBook    = require('../routes/FavBooks/addFavBook.js')
const getFavBook    = require('../routes/FavBooks/getFavBook.js')
const removeFavBook = require('../routes/FavBooks/removeFavBook.js')


// >UserRouter
const delUser       = require('../routes/UserRoutes/DeleteUser.js')
const editUser      = require('../routes/UserRoutes/EditUserData.js')
const editAdminUser = require('../routes/UserRoutes/EditUserDataAdmin.js')
const listAllUser   = require('../routes/UserRoutes/ListAllUsers.js')
const userData      = require('../routes/UserRoutes/UserData.js')


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


(module).exports = router;

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