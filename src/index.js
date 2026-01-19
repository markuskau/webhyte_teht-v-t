import express from 'express';
import (getItems) from './items.js';
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
app.put('/items/:id', (req, res) => {
  res.json(items);
});

// delete route for removing an item
app.delete('items/:id', (req, res) => {
  res.json(items);
});

// add new item
app.post('/items', postItem);




app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
