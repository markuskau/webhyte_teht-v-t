import express from 'express';
import {
  getItems, 
  getItemsbyId, 
  deleteItem, 
  postItem, 
  putItembyId, 
} from './items.js';
import {getUsers, postLogin, postUser} from './users.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;


// parsitaan json data pyynnöstä ja lisää request-objektiin
app.use(express.json());

// tarjotaan websivusto (fe) palvelimen juuresta
app.use(express.static('public'));


// API root
app.get('/api', (req, res) => {
  res.send('Welcome to my REST API!');
});



// Get all items
app.get('/items', getItems);

// get item based on id
app.get('/items/:id', getItemsbyId);

// put route for updating existing item
app.put('/items/:id', putItembyId);

// delete route for removing an item
app.delete('items/:id', deleteItem);
// add new item
app.post('/items', postItem);


// Users resource endpoints
// GET all users
app.get('/api/users', getUsers);
// POST new user
app.post('/api/users', postUser);
// POST user login
app.post('/api/users/login', postLogin);

// TODO: get user by id
// app.get('/api/users/:id');

// TODO: put user by id

// TODO: delete user by id




app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
