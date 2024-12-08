# Todo List Application

A simple Todo List application built with React and Node.js, allowing users to create, edit, delete, and manage tasks.

## Features

- Create new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as complete/incomplete
- User authentication

## Technologies

- **Frontend**: React, Vite
- **Backend**: Node.js, Express, MongoDB
- **Styling**: Tailwind CSS (or your preferred styling framework)

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Clone the Repository

```bash
git clone https://github.com/Thyda-Eng/todo_list_node.git
cd todo_list_node
# For the server
cd server
npm install

#Create .env file and add your configuration variables. Example:
MONGO_URI=your_mongo_db_uri
PORT=your_port
SECRET_KEY=your_secret_key

#Seed sample user data
node seeds/user.js
npm start

#For client
cd ../client

#Create .env file and add your configuration variables. Example:
VITE_API_URL=http://localhost:5000/apigit 

npm install
npm run dev