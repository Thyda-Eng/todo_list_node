import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    required: true,
    ref: 'User' // Specify the model to reference
  },
}, { timestamps: true });
  
const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task;