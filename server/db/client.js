import { MongoClient } from "mongodb";
import 'dotenv/config';
import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    let db = client.db("todo_list_db");

    // Initialize Mongoose Connection
    await mongoose.connect(uri,{});
    console.log("Mongoose connected to MongoDB!");

  } catch (err) {
    console.log('CANNOT CONNECT TO DB !!!');
    console.error(err);
  }
}

// Call the connection function
connectToDatabase();

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);

const userSchema = new mongoose.Schema({
    full_name: String,
    age: Number,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    passowrd: String,
    taks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },{ timestamps: true });
  
const User = mongoose.models.User || mongoose.model('User', userSchema);

// Export the Mongoose model for use in other files
export { client, Task, User };