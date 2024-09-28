const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: String,
  date: String,
  completed: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to user
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
