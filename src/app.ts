// @ts-ignore
import express from "express";
// @ts-ignore
import cors from "cors";
import * as bodyParser from "body-parser";
import routes from "./routes";
import Database from "./database";

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.datasource();
  }

  private middlewares(): void {
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(cors());
    this.express.use(routes);
  }

  private datasource = (): void => {
    Database.connect();
  };
}

export default new App().express;
