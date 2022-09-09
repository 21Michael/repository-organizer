import 'dotenv/config';
import mongoose, { Connection } from "mongoose";
import toJson from "@meanie/mongoose-to-json";
import { MongooseConnectionOptions } from '../types/config/mongoose'
mongoose.plugin(toJson); // _id => id

const URI: string = process.env.ATLAS_URI;


const mongooseConnectionOptions: MongooseConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(URI, mongooseConnectionOptions);
    const connection: Connection = mongoose.connection;
    await connection.once("open", () => {
      console.log("MongoDB connected with server");
    });
    console.log("MongoDB connected with server");
  } catch (e) {
    console.log("MongoDB connection error:", e);
  }

};

export const mongoDBConnectionClose = async () => {
  await mongoose.connection.close();
  const connection: Connection = mongoose.connection;
  await connection.once("open", () => {
    console.log("MongoDB disconnected with server");
  });
};


export default mongoDBConnection;
