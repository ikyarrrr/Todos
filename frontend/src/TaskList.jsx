import React from 'react';

function TaskList({ tasks, onToggleTask, onDeleteTask, selectedDate }) {
  return (
    <div>
      <h2>Tasks for {selectedDate}</h2>
      {/* Not Completed Section */}
      <div className="task-section">
        <h3>Not Completed</h3>
        <ul>
          {tasks.filter(task => !task.completed).map(task => (
            <li key={task._id}>
              <span 
                onClick={() => onToggleTask(task._id)}
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              >
                {task.text}
              </span>
              <button onClick={() => onDeleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Completed Section */}
      <div className="task-section">
        <h3>Completed</h3>
        <ul>
          {tasks.filter(task => task.completed).map(task => (
            <li key={task._id}>
              <span 
                onClick={() => onToggleTask(task._id)}
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
              >
                {task.text}
              </span>
              <button onClick={() => onDeleteTask(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
