const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.patch('/tasks/:id/toggle', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Todo.findById(taskId);

    if (task) {
      task.completed = !task.completed;  
      await task.save();
      res.status(200).json({ message: 'Task status updated', task });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating task status', error });
  }
});

module.exports = router;
