// @ts-ignore
import mongoose from "mongoose";
import { Response } from "express";

interface DatabaseInterface {
  connect: () => void;
  insertOn: (table: any, payload: any) => Promise<any>;
  findOneOn: (table: any, filter: any) => Promise<any>;
  findByIdOn: (table: any, filter: any) => Promise<any>;
  deleteOneOn: (table: any, filter: any) => Promise<any>;
}

class Database implements DatabaseInterface {
  private dbName = "mongoDB";

  public connect() {
    console.log(`|=> Trying to connect to MongoDB database...`);
    mongoose
      .connect(
        `${process.env.DATABASE_CONNECTION_STRING}/${process.env.DATABASE_NAME}`,
        {
          user: process.env.DATABASE_USER,
          pass: process.env.DATABASE_PASS,
          useNewUrlParser: true,
        }
      )
      .then(() =>
        console.log("|=> Connection to the database has been established!")
      )
      .catch((error) =>
        console.log("Database connection error:", error.code, error.message)
      );
  }

  public async insertOn(table: any, payload: any) {
    let result;
    try {
      if (this.dbName === "mongoDB") {
        result = await table.create(payload);
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findOneOn(table: any, filter: any) {
    let result;
    try {
      if (this.dbName === "mongoDB") {
        result = await table.findOne(filter);
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findByIdOn(table: any, id: any, config?: any) {
    let result;
    try {
      if (this.dbName === "mongoDB") {
        result = await table.findById(id, config);
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async deleteOneOn(table: any, filter: any) {
    let result;
    try {
      if (this.dbName === "mongoDB") {
        result = await table.deleteOne(filter);
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new Database();
