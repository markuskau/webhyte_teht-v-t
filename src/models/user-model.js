// Tuodaan tietokantayhteys
import promisePool from '../utils/database.js';


// GET /api/users - listaa kaikki käyttäjät
const findAllUsers = async () => {
  // SQL kysely: haetaan käyttäjänimi ja luontipäivä Users-taulusta
  const sql = 'SELECT username, created_at FROM Users';
  // execute suorittaa prepared statement- kyselyn
  const [rows] = await promisePool.execute(sql);
  // Palautetaan kaikki rivit controllerille
  return rows;
};

// GET /api/users/:id - hakee käyttäjän id:n perusteella
const findUserById = async (id) => {
  // SQL kysely
  const sql = 'SELECT * FROM Users WHERE user_id = ?';
  // Suoritetaan kysely ja annetaan id parametrina
  const [rows] = await promisePool.execute(sql, [id]);
  // Palautetaan ensimmäinen tulos
  return rows[0];
};


// POST /api/users - lisätään uusi käyttäjä
const addUser = async (user) => {
  // Puretaan user-objektista kentät
  const {username, password, email} = user;
  // SQL INSERT kysely
  const sql = `INSERT INTO Users (username, password, email)
               VALUES (?, ?, ?)`;
  // Parametrit prepared statementille
  const params = [username, password, email];
  try {
    // Suoritetaan INSERT kysely
    const result = await promisePool.execute(sql, params);
    // Palautetaan lisätyn käyttäjän id
    return {user_id: result[0].insertId};
  } catch (e) {
    // jos virhe tapahtuu
    console.error('error', e.message);
    // palautetaan virhe controllerille
    return {error: e.message};
  }
};

// Huom: virheenkäsittely puuttuu
// Haetaan käyttäjän käyttäjänimen perusteella
const findUserByUsername = async (username) => {
  // SQL kysely username:n perusteella
  const sql = 'SELECT * FROM Users WHERE username = ?';
  // Suoritetaan prepared statement
  const [rows] = await promisePool.execute(sql, [username]);
  // Palautetaan ensimmäinen tulos
  return rows[0];
};

export {findUserByUsername, findAllUsers, findUserById, addUser};