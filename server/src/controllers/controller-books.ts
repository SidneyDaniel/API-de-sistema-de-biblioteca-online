import db from "@src/database/fireStore-config";
import { Request, Response } from "express";
import admin from 'firebase-admin';


interface Livro {
    name: string;
    author: string;
    publisher: string;
    pages: number;
    cover: string;
    readLink: string;
    bookDataCreation: Date;
}


class BooksController {
   async readBook(req: Request , res: Response){
        db.collection("tarefas").get().then((querySnapshot) => {
          const ALLBOOKS: Array<Livro> = [];
      
          querySnapshot.forEach((doc) => {
              const data = doc.data();
      
              const book = {
                  name: data.bookName,
                  author: data.bookAuthor,
                  publisher: data.bookPublisher,
                  pages: data.numberOfPages,
                  cover: data.bookCover,
                  readLink: data.readLink,
                  bookDataCreation: data.bookDataCreation,
                  bookUpdateDate: data.bookUpdateDate
              };
      
              ALLBOOKS.push(book);
              
          })
          console.log(ALLBOOKS);
          
          res.json({ALLBOOKS})
        });
      
    }

    async createBook(req: Request, res: Response){
        const { bookName, bookAuthor, bookPublisher, numberOfPages, readLink, bookCover } = req.body;
  
        db.collection('tarefas').add({
        bookName: bookName,
        bookAuthor: bookAuthor,
        bookPublisher: bookPublisher,
        numberOfPages: numberOfPages,
        readLink: readLink,
        bookCover: bookCover,
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
    }

    async removeBook(req: Request, res: Response){
        const { title } = req.body;
        console.log(title);
        db.collection("tarefas").where("bookName", "==", title).get().then((querySnapshot) => {
          // Verificando se algum documento foi encontrado
          if (!querySnapshot.empty) {
              // Obtendo o ID do primeiro documento encontrado
              const docId = querySnapshot.docs[0].id;
              console.log("Document ID:", docId);
              
              // Excluir documento com base em seu id(docId) do banco de dados
      
              db.collection("tarefas").doc(docId).delete().then(() => {
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
    }

    async editBook(req: Request, res: Response){
        const { currentTitle, newBookName, newBookauthor, newBookPublisher, newBooksPages } = req.body;
        console.log(currentTitle);
        db.collection("tarefas").where("bookName", "==", currentTitle).get().then((querySnapshot) => {
          if (!querySnapshot.empty) {
              const docId = querySnapshot.docs[0].id;
              db.collection("tarefas").doc(docId).update({
                  bookName:      newBookName,
                  bookAuthor:    newBookauthor,
                  bookPublisher: newBookPublisher,
                  numberOfPages: newBooksPages
              }).then(() => {
                  console.log("Document successfully updated!");
                  res.json("Document successfully updated! EDITADO, SERVIDOR!")
              }).catch((error) => {
                  console.error("Error updating document: ", error);
              });
          } else {
              console.log("No documents found");
          }
      }).catch((error) => {
          console.error("Error searching for document: ", error);
      });
      
    }

    


};

export default BooksController;