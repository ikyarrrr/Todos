import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (userData) => API.post('/users/register', userData);
export const loginUser = (userData) => API.post('/users/login', userData);
export const addTodo = (taskData) => API.post('/todos/add', taskData);
export const getTodos = () => API.get('/todos/tasks');
export const deleteTodo = (taskId) => API.delete(`/todos/tasks/${taskId}`);
export const toggleTodoCompletion = (taskId) => API.patch(`/todos/tasks/${taskId}/toggle`);  // API for toggling task completion
