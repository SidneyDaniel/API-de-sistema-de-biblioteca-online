import db from "@src/database/fireStore-config";
import { Request, Response } from "express";
import UserSession from "@src/services/getUid-service";
import admin from 'firebase-admin';

interface Livro {
    name: string;
    author: string;
    publisher: string;
    pages: number;
    cover: string;
    readLink: string;
}

class FavBooks{
    async addBooksFavorite(req: Request, res: Response){
        const { bookInfo } = req.body;
        // console.log(bookInfo.name);
        bookInfo.forEach((book: Livro) => {
          console.log(book.name);
        
          const userSession = new UserSession(req);

          userSession.getUserInfo().then(async (userInfo) => {
            const favoriteBooks = db.collection('usuarios').doc(userInfo.uid).collection('livrosFavoritos');
                
            favoriteBooks.add({
              bookName: book.name,
              bookAuthor: book.author,
              bookPublisher: book.publisher,
              numberOfPages: book.pages,
              readLink: book.readLink,
              bookCover: book.cover,
              bookDataCreation: admin.firestore.FieldValue.serverTimestamp()
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef.id);
              res.status(200).json({ message: "Document written with ID: " + docRef.id });
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                res.status(500).json({ message: "Error adding document: " + error });
            });
            
            console.log('Documento adicionado com sucesso!');
          })

          // const cookieHeader = req.headers.cookie || '';
          // const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
          // const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
          // const sessionValue = sessionCookie ? sessionCookie.split('=')[1] : '';
    
          // admin.auth()
          //   .verifySessionCookie(sessionValue, true)
          //   .then((decodedClaims) => {
          //     admin.auth().getUserByEmail(decodedClaims?.email || '')
          //     .then(async (userRecord) => {
          //       const favoriteBooks = db.collection('usuarios').doc(userRecord.uid).collection('livrosFavoritos');
                
          //       favoriteBooks.add({
          //         bookName: book.name,
          //         bookAuthor: book.author,
          //         bookPublisher: book.publisher,
          //         numberOfPages: book.pages,
          //         readLink: book.readLink,
          //         bookCover: book.cover,
          //         bookDataCreation: admin.firestore.FieldValue.serverTimestamp()
          //       })
          //       .then((docRef) => {
          //         console.log("Document written with ID: ", docRef.id);
          //         res.status(200).json({ message: "Document written with ID: " + docRef.id });
          //       })
          //       .catch((error) => {
          //           console.error("Error adding document: ", error);
          //           res.status(500).json({ message: "Error adding document: " + error });
          //       });
                
          //       console.log('Documento adicionado com sucesso!');
          //     })
          //     .catch(error => {
          //       console.error('Erro ao recuperar as informações do usuário:', error);
          //     });
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        //========================
        }); 
    
    }

    async getBooksFavorite(req: Request, res: Response){
    const cookieHeader = req.headers.cookie || '';
    const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
    const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
    const sessionValue = sessionCookie ? sessionCookie.split('=')[1] : '';

    
    admin.auth()
      .verifySessionCookie(sessionValue, true)
      .then((decodedClaims) => {
        admin.auth().getUserByEmail(decodedClaims?.email || '')
        .then(async (userRecord) => {
          
          db.collection('usuarios').doc(userRecord.uid).collection('livrosFavoritos').get().then((querySnapshot) => {
            const ALLFAVBOOKS: Array<Livro> = [];
      
            querySnapshot.forEach((doc) => {
                const data = doc.data();
      
                const book = {
                    name: data.bookName,
                    author: data.bookAuthor,
                    publisher: data.bookPublisher,
                    pages: data.numberOfPages,
                    cover: data.bookCover,
                    readLink: data.readLink
                };
        
                ALLFAVBOOKS.push(book);
                
            })
            console.log(ALLFAVBOOKS);
            
            res.json({ALLFAVBOOKS})
          }); 
          
        })
        .catch(error => {
          console.error('Erro ao recuperar as informações do usuário:', error);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }

    async removeBooksFavorite(req: Request, res: Response){
        getUIDFromSession(req).then((uid: string) => {
              console.log(uid);
              const { title } = req.body;
              console.log(title);
              db.collection('usuarios').doc(uid).collection('livrosFavoritos').where("bookName", "==", title).get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const docId = querySnapshot.docs[0].id;
                    console.log("Document ID:", docId);
                          
                    db.collection('usuarios').doc(uid).collection('livrosFavoritos').doc(docId).delete().then(() => {
                        console.log("Document successfully deleted!");
                        res.json("Document successfully deleted: RESPOSTA SERVIDOR!")
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                        
                    });
            
                } else {
                    console.log("No documents found");
                }
              }).catch((error) => {
                console.error("Error searching for document: ", error);
              });
            
          });
      
    }
}

function getUIDFromSession(req: Request): Promise<string> {
    return new Promise((resolve, reject) => {
      const cookieHeader = req.headers.cookie || '';
      const cookies = cookieHeader.split(';').map(cookie => cookie.trim());
      const sessionCookie = cookies.find(cookie => cookie.startsWith('session='));
      const sessionValue = sessionCookie ? sessionCookie.split('=')[1] : '';
  
      admin.auth()
        .verifySessionCookie(sessionValue, true)
        .then((decodedClaims) => {
          admin.auth().getUserByEmail(decodedClaims?.email || '')
          .then((userRecord) => {
            resolve(userRecord.uid);
          })
          .catch(error => {
            console.error('Erro ao recuperar as informações do usuário:', error);
            reject(error);
          });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
}

export default FavBooks;