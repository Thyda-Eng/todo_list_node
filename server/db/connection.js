import { MongoClient, ServerApiVersion } from "mongodb";
import 'dotenv/config';

import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.log('CANNOT CONNECT TO DB !!!')
  console.error(err);
}

let db = client.db("todo_list_db");

export default db;
