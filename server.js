const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const Todo = require('./models/Todo');


//Execute express 
const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

const port = 5000;


const connectionString = process.env.MONGO_URI;
mongoose.connect(connectionString, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false, // To disable deprecation warning for findOneAndUpdate
  // useCreateIndex: true,
})
    .then(() => console.log('Connected to the database…'))
    .catch((err) => console.error('Connection error:', err));

//Routes 
app.get('/api/todo', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post('/api/todo/new', async (req, res) => {
    const newTask = await Todo.create(req.body);
    res.status(201).json({ newTask })
})

app.delete('/api/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
})


app.listen(port, () => console.log(`Server is running on port ${port}`));
