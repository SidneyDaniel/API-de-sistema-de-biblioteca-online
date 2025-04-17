export interface docRefId{
    id: string
}
  
export interface collectionItem {
    docName: string;
    accessCode: string;
}

/**
 * @description  Structure of a book stored in the database.
 */

export interface BookModel {
    name: string;
    author: string;
    publisher: string;
    pages: number;
    cover: string;
    readLink: string;
}

