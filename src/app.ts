import express from 'express';
import session from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import { Server } from 'http'
import admin from 'firebase-admin'
import dotenv from 'dotenv'; 
dotenv.config()

import router from './routes/routes';

export class SetupAplication {
  private server?: Server

  constructor(private port = 3000, public app = express()) {}

  public init(): void {
    this.setupAdminFirebase();
    this.setupExpress();
    this.setupRoutes();
  }

  
  private setupRoutes(): void {
    this.app.use(router);
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.setupSessionConfigs();
    this.setupPathToArquives();
  }

  private setupSessionConfigs(): void {
    this.app.use(session({
      secret: 'your-session-secret',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }));
  }

  private setupPathToArquives(): void{
    // this.app.use(express.static(path.join('\\API de sistema de biblioteca online')))
    const rootPath = path.join(__dirname, '..'); 
    this.app.use(express.static(rootPath));
  }
  
  private setupAdminFirebase():void {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId:  process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server running on port http://localhost:${this.port}/`);
    });
  }
}