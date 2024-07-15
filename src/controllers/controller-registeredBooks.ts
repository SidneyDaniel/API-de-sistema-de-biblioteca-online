import { Request, Response } from "express";
import db from "@src/database/fireStore-config";

class ResgisteredController{
    async registeredBooks(req: Request, res: Response){
        const { date } = req.body;
        console.log(date);
        const collectionName = 'tarefas';
        const dateField = 'bookDataCreation';
        const targetDate = new Date(date);

        const startOfYear = new Date(targetDate.getFullYear(), 0, 1);
        const endOfYear = new Date(targetDate.getFullYear(), 11, 31);

        const query = db.collection(collectionName)
            .where(dateField, '>=', startOfYear)
            .where(dateField, '<=', endOfYear);

        const snapshot = await query.get();
        const booksByDay: {[dateKey: string]: number} = {};
        snapshot.forEach(doc => {
            const bookDate = doc.get(dateField).toDate();
            const day = bookDate.getDate();
            const month = bookDate.getMonth() + 1;
            const year = bookDate.getFullYear();
            const dateKey = `${day}-${month}-${year}`;

            if (!booksByDay[dateKey]) {
                booksByDay[dateKey] = 0;
            }
            booksByDay[dateKey]++;
        });

        for (const [dateKey, numBooks] of Object.entries(booksByDay)) {
            console.log(`Data ${dateKey}: ${numBooks} livros cadastrados`);
        }

        const dates = new Set();
        snapshot.forEach(doc => {
            const bookDate = doc.get(dateField).toDate();
            const day = bookDate.getDate();
            const month = bookDate.getMonth() + 1;
            const year = bookDate.getFullYear();
            const dateKey = `${month}-${day}-${year}`;
            dates.add(dateKey);
        });

        dates.forEach(date => {
            console.log(`Data: ${date}`);
        });

        const response = {
            dates: Array.from(dates),
            booksByDay: booksByDay
        };

        res.json(response);
        console.log(response);
    };

    async lastRegisteredBook(req: Request, res: Response){
        const query = db.collection('tarefas').orderBy('bookDataCreation', 'desc').limit(1);
        query.get().then(snapshot => {
            const newestDoc = snapshot.docs[0];
            console.log(newestDoc.data());
            res.json(newestDoc.data());

        }).catch(error => {
            console.error(error);
            res.status(500).send(error);

        });
    }
};

export default ResgisteredController;