import express from 'express';
import {
  deleteItemById,
  getItemById,
  getItems,
  postNewItem,
  putItemById,
} from '../controllers/itemController.js';

const itemRouter = express.Router();

// Get item based on id¨
itemRouter.route('/').get(getItems).post(postNewItem);

// Add new item

itemRouter
  .route('/:id')
  .get(getItemById)
  // PUT route for items
  .put(putItemById)
  // DELETE route for items
  .delete(deleteItemById);

// Add new item
itemRouter.post('/', postNewItem);

export default itemRouter;
