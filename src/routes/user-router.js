import express from 'express';
import {body} from 'express-validator';
import {
  deleteUserById,
  getUserById,
  getUsers,
  postLogin,
  postUser,
  putUserById,
  getMe,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrorHandler} from '../middlewares/error-handlers.js';

const userRouter = express.Router();

// Users resource endpoints
userRouter
  .route('/')
  // GET all users
  .get(authenticateToken, getUsers)
  // POST new user
  .post(
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8, max: 100}),
    body('email').trim().isEmail(),
    validationErrorHandler,
    postUser,
  );

// POST user login
userRouter.post('/login', postLogin);

// Get user info based on token
userRouter.get('/me', authenticateToken, getMe);

// app.get('/api/users/:id');
userRouter.get('/:id', getUserById);
// PUT user by id
userRouter.put('/:id', putUserById);
// DELETE user by id
userRouter.delete('/:id', deleteUserById);

export default userRouter;
