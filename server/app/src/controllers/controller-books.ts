import db from "@src/database/fireStore-config";
import { Request, Response } from "express";
import admin from 'firebase-admin';


interface BookModel {
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
        try {  
            const querySnapshot = await db.collection("tarefas").get()

            const ALLBOOKS: BookModel[] = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    name: data.bookName,
                    author: data.bookAuthor,
                    publisher: data.bookPublisher,
                    pages: data.numberOfPages,
                    cover: data.bookCover,
                    readLink: data.readLink,
                    bookDataCreation: data.bookDataCreation,
                    bookUpdateDate: data.bookUpdateDate
                };
            })
            console.log(ALLBOOKS);
            res.status(200).json({ ALLBOOKS })
        } catch (error) {
            res.status(500).json({message: `Error reading the documents: ${(error as Error).message}`})
        }
    }

    async createBook(req: Request, res: Response){
        const { bookName, bookAuthor, bookPublisher, numberOfPages, readLink, bookCover } = req.body;
        
        try {
            const docRef = await db.collection('tarefas').add({
                bookName: bookName,
                bookAuthor: bookAuthor,
                bookPublisher: bookPublisher,
                numberOfPages: numberOfPages,
                readLink: readLink,
                bookCover: bookCover,
                bookDataCreation: admin.firestore.FieldValue.serverTimestamp()
            })

            console.log("Document written with ID: ", docRef.id);
            res.status(201).json({ message: "Document written with ID: " + docRef.id });   
        } catch (error) {
            console.error("Error adding document: ", error);
            res.status(500).json({ message: "Error adding document: " + error });
        }
    }

    async removeBook(req: Request, res: Response){
        const { title } = req.body;
        console.log(title);

        const collection = db.collection("tarefas")

        try {
            const querySnapshot = await collection.where("bookName", "==", title).get()

            if (!querySnapshot.empty) {
                const docId = querySnapshot.docs[0].id;
                const remove = await db.collection("tarefas").doc(docId).delete()

                if (!remove) { throw new Error }
            
                res.status(204).json({success: true,message:"Document successfully deleted"})
            } else {
                res.status(404).json({
                    message: 'No documents found'
                })
            }

        } catch (error) {
            res.status(409).json({
                success: false, 
                message: (error as Error).message
            })
        }
    }

    async editBook(req: Request, res: Response){
        const { currentTitle, newBookName, newBookauthor, newBookPublisher, newBookPages, newReadLink, newBookCover } = req.body;
        console.log(currentTitle, newBookName, newBookauthor, newBookPublisher, newBookPages, newReadLink, newBookCover);

        const database = db.collection("tarefas")

        try {
            const querySnapshot = await database.where("bookName", "==", currentTitle).get()
            const docId = querySnapshot.docs[0].id;

            const update = database.doc(docId).update({
                bookName:      newBookName,
                bookAuthor:    newBookauthor,
                bookPublisher: newBookPublisher,
                numberOfPages: newBookPages,
                readLink: newReadLink,
                bookCover: newBookCover,
                bookUpdateDate: admin.firestore.FieldValue.serverTimestamp()
            })

            if (!update) { throw new Error }

            res.status(200).json({
                success: true,
                message: "Document successfully updated."
            })

        } catch (error) {
            res.status(409).json({
                success: false, 
                message: (error as Error).message
            })
        }      
    }

    async deleteBooksBatch(req: Request, res: Response){
        const { bookTitles } = req.body;
        console.log(bookTitles);

        const deletionPromises = [];

        for (const bookTitle of bookTitles) {
            try {
            const querySnapshot = await db.collection("tarefas")
                .where("bookName", "==", bookTitle)
                .get();

            if (!querySnapshot.empty) {
                const docId = querySnapshot.docs[0].id;
                console.log("Document ID:", docId);

                deletionPromises.push(db.collection("tarefas").doc(docId).delete());
            } else {
                console.log("No document found for:", bookTitle);
            }
            } catch (error) {
            console.error("Error searching for document:", error);
            }
        }

        try {
            await Promise.all(deletionPromises);
            console.log("Documents successfully deleted!");
            res.status(204).json({success: true, message:"Documents successfully deleted."});
        } catch (error) {
            console.error("Error deleting documents:", error);
            res.status(404).json({success: false, message: (error as Error).message})
        }
        
    }
};

export default BooksController;