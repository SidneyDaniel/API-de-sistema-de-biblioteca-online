export type Book = {
    author: string;
    bookDataCreation: {
      _seconds: number;
      _nanoseconds: number;
    };
    bookUpdateDate: {
      _seconds: number;
      _nanoseconds: number;
    };
    cover: string;
    name: string;
    pages: string;
    publisher: string;
    readLink: string;
};

export interface InputUser{
    creationTime: Date;
    disabled: boolean;
    displayName: string;
    email: string;
    emailVerified: boolean;
    lastSignInTime: Date;
    tokensValidAfterTime: Date;
    uid: string;
}

export interface OutputUser {
  name: string;
  email: string;
  uid: string;
  status: boolean;
}

  