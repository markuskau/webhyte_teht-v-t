import express from 'express';
import {deleteUserById, getUserById, getUsers, postLogin, postUser, putUserById} from '../controllers/user-controller.js';

const userRouter = express.Router();

// Users resource endpoints
userRouter.route('/')
// GET all users
.get(getUsers)
// POST new user
.post(postUser);


// POST user login
userRouter.post('/api/users/login', postLogin);

// app.get('/api/users/:id');
userRouter.get('/:id', getUserById);
// PUT user by id
userRouter.put('/:id', putUserById);
// DELETE user by id
userRouter.delete('/:id', deleteUserById);

export default userRouter;
