import mongoose from 'mongoose';
import 'dotenv/config';
import User from '../models/userModel.js';

const uri = process.env.MONGODB_URI || "";

async function seedUsers() {
  try {
    await mongoose.connect(uri, {});
    console.log("Mongoose connected to MongoDB!");

    // Sample user data
    const users = [
      {
        full_name: 'Alice Smith',
        age: 25,
        email: 'alice@example.com',
        password: 'password123',
      },
      {
        full_name: 'Bob Johnson',
        age: 30,
        email: 'bob@example.com',
        password: 'password123',
      },
      {
        full_name: 'Charlie Brown',
        age: 22,
        email: 'charlie@example.com',
        password: 'password123',
      },
    ];

    for (const user of users) {
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create(user);
        console.log(`Inserted user: ${user.full_name}`);
      } else {
        console.log(`User with email ${user.email} already exists.`);
      }
    }
    console.log("Users seeded successfully!");

  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedUsers();