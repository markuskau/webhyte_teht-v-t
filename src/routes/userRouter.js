import express from 'express';
import {deleteUserById, getUserById, getUsers, postLogin, postUser, putUserById} from '../controllers/userController.js';

const userRouter = express.Router();

// Users resource endpoints

userRouter.route('/').get(getUsers).post(postUser);
// GET all users

// POST user login
userRouter.post('/api/users/login', postLogin);

// TODO: get user by id
// app.get('/api/users/:id');
userRouter.get('/:id', getUserById);

// TODO: put user by id
userRouter.put('/:id', putUserById);

// TODO: delete user by id
userRouter.delete('/:id', deleteUserById);

export default userRouter;
