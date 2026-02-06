import promisePool from '../utils/database.js';

// TODO: lisää modelit ja muokkaa kontrollerit reiteille:
// GET /api/users - list all users
const findAllUsers = async () => {
  const sql = 'SELECT * FROM Users';
  const [rows] = await promisePool.execute(sql);
  return rows;
};
// GET /api/users/:id - get user by id
const findUserById = async (id) => {
  const sql = 'SELECT * FROM Users WHERE user_id = ?';
  const [rows] = await promisePool.execute(sql, [id]);
  return rows[0];
};
// POST /api/users - add a new user
const addUser = async (user) => {
  const {username, password, email} = user;
  const sql = `INSERT INTO Users (username, password, email) VALUES (?, ?, ?)`;
  const [result] = await promisePool.execute(sql, [username, password, email]);
  return {id: result.insertId, username, email};
};

// Huom: virheenkäsittely puuttuu
const findUserByUsername = async (username) => {
  const sql = 'SELECT * FROM Users WHERE username = ?';
  const [rows] = await promisePool.execute(sql, [username]);
  return rows[0];
};

export {findUserByUsername, findAllUsers, findUserById, addUser};
