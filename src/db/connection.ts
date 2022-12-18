import mongoose, { Mongoose } from "mongoose";
import { IORM } from "../helpers/interfaces";
import config from "../config";

class DB implements IORM<Mongoose> {
  readonly orm: Mongoose;

  constructor() {
    this.orm = mongoose;
    this.orm.set('strictQuery', true)
  }

  public connect() {
    try {
      this.orm.connect(config.URL!).then(()=>{
          console.log('connected to database');
      });
    } catch (error) {
      console.log(error);
    }
  }
}

new DB().connect();
