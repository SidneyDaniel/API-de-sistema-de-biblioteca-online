import express from 'express';
import session from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import { Server } from 'http';
// import admin from 'firebase-admin'
import dotenv from 'dotenv'; 
dotenv.config()

import router from './routes/routes';

export class SetupAplication {
  private server?: Server

  constructor(private port = 3000, public app = express()) {}

  public init(): void {
    // this.setupAdminFirebase();
    this.setupExpress();
    this.setupRoutes();
    this.setup404Handler(); 

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
    const rootPath = path.join(__dirname, '../../../client/dashboard-administracao/dist'); 
    this.app.use(express.static(rootPath));

    this.app.get('/', (req, res) => {
      res.sendFile(path.join(rootPath, 'index.html'));
  });
  }

  private setup404Handler(): void {
    this.app.use((req, res) => {
      // res.status(404).json({ message: 'Página não encontrada' }); 
      // res.redirect('/index.html');
      const rootPath = path.join(__dirname, '../../../client/dashboard-administracao/dist'); 
      res.status(404).sendFile(path.join(rootPath, 'index.html'));
    });
  }
  
  // private setupAdminFirebase():void {
  //   admin.initializeApp({
  //     credential: admin.credential.cert({
  //       projectId:  process.env.FIREBASE_PROJECT_ID,
  //       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  //       privateKey: process.env.FIREBASE_PRIVATE_KEY,
  //     }),
  //     databaseURL: process.env.FIREBASE_DATABASE_URL,
  //   });
  // }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.log('\x1b[1m\x1b[32m%s','Server running on port:','\x1b[4m',`http://localhost:${this.port}/`,'\x1b[0m');
    });
  }
}