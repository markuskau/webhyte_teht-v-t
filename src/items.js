const items = [
  {id: 1, name: 'Omena'},
  {id: 2, name: 'Appelsiini'},
  {id: 3, name: 'Ananas'},
];

const getItems = (req, res) => {
  res.json(items);
};

const getItemsbyId = (req, res) => {
  console.log('getting item id:', req.params.id);
  const itemFound = items.find(item => item.id == req.params.id);
  if (itemFound) {
    res.json(itemFound);
   } else {
    res.status(404).json({message: 'item not found'});
   }
  res.send(itemFound);
};

const putItembyId = 

const deleteItem = 

const postItem = (req, res) => {
  //console.log('add item request body', req.body)
  req.body.id = items.length + 1;
  items.push (req.body);
  res.status(201).json({message: 'new item added'});
};



export (getItems, getItemsbyId, putItembyId, deleteItem, postItem);
