const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); 

const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();  

app.use(express.json());
app.use(cors());  
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((error) => console.log("MongoDB connection error: ", error));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
