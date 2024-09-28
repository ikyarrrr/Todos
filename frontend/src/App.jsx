import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import TaskList from './TaskList'; // Import TaskList

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [newTask, setNewTask] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return;
    const newTodo = { _id: Date.now().toString(), text: newTask, date: selectedDate, completed: false };
    setTasks([...tasks, newTodo]);
    setNewTask('');
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task._id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task._id !== taskId);
    setTasks(updatedTasks);
  };

  const generateCalendar = (month, year) => {
    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const taskDate = new Date(year, month, day).toISOString().split('T')[0];
      const hasTasks = tasks.some(task => task.date === taskDate);
      days.push(
        <div
          key={day}
          className={`day ${taskDate === selectedDate ? 'selected' : ''} ${hasTasks ? 'active' : ''}`}
          onClick={() => setSelectedDate(taskDate)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const filteredTasks = tasks.filter(task => task.date === selectedDate);

  const handleLogin = () => setIsAuthenticated(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/tasks" /> : <Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tasks" element={isAuthenticated ? (
          <div className="container">
            <section className="task-list">
              <TaskList 
                tasks={filteredTasks}
                onToggleTask={toggleTaskCompletion}
                onDeleteTask={deleteTask}
                selectedDate={selectedDate}
              />
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a task"
              />
              <button onClick={addTask}>Add Task</button>
            </section>

            <section className="calendar">
              <div className="calendar-header">
                <h2>{new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
                <div className="calendar-navigation">
                  <button onClick={prevMonth}>&lt;</button>
                  <button onClick={nextMonth}>&gt;</button>
                </div>
              </div>
              <div className="weekdays">
                <div>Sun</div>
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
              </div>
              <div className="days">
                {generateCalendar(currentMonth, currentYear)}
              </div>
            </section>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
