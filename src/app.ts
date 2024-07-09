import express from 'express';
import session from 'express-session';
import path from 'path';
import bodyParser from 'body-parser';
import { Server } from 'http'

import  { router }  from './routes/routes';

export class SetupAplication {
  private server?: Server

  constructor(private port = 3000, public app = express()) {}

  public init(): void {
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
    this.app.use(express.static(path.join('\\litterisinventum')))
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}