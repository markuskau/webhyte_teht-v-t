import {addUser, findAllUsers, findUserById, findUserByUsername} from '../models/user-model.js';


// GET /api/Users
const getUsers = async (req, res) => {
  const users = await findAllUsers();
  // ÄLÄ IKINÄ lähetä salasanoja
  users.forEach((user) => {
    delete user.password;
  });
  res.json(users);
};


// GET /api/Users/:id
const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) {
    return res.status(404).json({error: 'user not found'});
  };
  delete user.password;
  res.json(user);
};


// TODO: putUserById
const putUserById = async (req, res) => {
  const updated = await (req.params.id);
  if (!user) {
    return res.status(404).json({error: 'user not found'});
  };
  delete user.password;
  res.json(user);
};

// DELETE /api/Users/:id
const deleteUserById = async (req, res) => {
  const deleted = await deleteUserById(req.params.id);
  if (!deleted) {
    return res.status(404).json({error: 'user not found'});
  }
  res.json({message: 'user deleted'});
};

// Käyttäjän lisäys (rekisteröityminen)
// POST /api/Users
const postUser = (req, res) => {
  const {username, password, email} = req.body;
  if (!(username && password && email)) {
    return res.status(400).json({error: 'required fields missing'});
  }
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({error: 'username already exists'});
  }
  const newUser = await addUser ({
    username, password, email
  });
  
  res.status(201).json({message: 'new user added', newUser.id});
};


// POST /api/login
const postLogin = async (req, res) => {
  const {username, password} = req.body;
  // haetaan käyttäjä-objekti käyttäjän nimen perusteella
  const user = await findUserByUsername(username);
  //console.log('postLogin user from db', user);
  if (user) {
    if (user.password === password) {
      delete user.password;
      return res.json({message: 'login ok', user: user});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};

export {getUsers, postUser, postLogin, getUserById, putUserById, deleteUserById};