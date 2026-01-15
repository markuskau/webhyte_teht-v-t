import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

const items = [
  {id: 1, name: 'Omena'},
  {id: 2, name: 'Appelsiini'},
  {id: 3, name: 'Ananas'},
];

// parsitaan json data pyynnöstä ja lisää request-objektiin
app.use(express.json());

// API root
app.get('/', (req, res) => {
  res.send('Welcome to my REST API!');
});

// Get all items
app.get('/items', (req, res) => {
  res.json(items);
});

// get item based on id
app.get('/items/:id', (req, res) => {
  console.log('getting item id:', req.params.id);
  const itemFound = items.find(item => item.id == req.params.id);
  if (itemFound) {
    res.json(itemFound);
   } else {
    res.status(404).json({message: 'item not found'});
   }
  res.send(itemFound);
});

// put route for updating existing item
app.put('/items/:id', (req, res) => {
  res.json(items);
});

// delete route for removing an item
app.delete('items/:id', (req, res) => {
  res.json(items);
});

// add new item
app.post('/items', (req, res) => {
  //console.log('add item request body', req.body)
  req.body.id = items.length + 1;
  items.push (req.body);
  res.status(201).json({message: 'new item added'});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
