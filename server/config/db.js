import { MongoClient } from "mongodb";
import 'dotenv/config';
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    let db = client.db("todo_list_db");
    await mongoose.connect(uri,{});
    console.log("Mongoose connected to MongoDB!");

  } catch (err) {
    console.log('CANNOT CONNECT TO DB !!!');
    console.error(err);
  }
}
export { connectToDatabase };