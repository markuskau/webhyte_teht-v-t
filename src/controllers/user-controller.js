// salasanan hashaukseen
import bcrypt from 'bcryptjs';
// JWT tokenien luomiseen
import jwt from 'jsonwebtoken';
// tuodaan model-funktiot tietokantaa varten
import {addUser, findAllUsers, findUserById, findUserByUsername} from '../models/user-model.js';


// GET /api/Users
// Haetaan kaikki käyttäjät
const getUsers = async (req, response) => {
  const users = await findAllUsers();
  response.json(users);
};


// GET /api/Users/:id
// Haetaan käyttäjän id:n perusteella
const getUserById = async (req, res) => {
  // Haetaan käyttäjä tietokannasta
  const user = await findUserById(req.params.id);
  // jos käyttäjää ei löytynyt
  if (!user) {
    return res.status(404).json({error: 'user not found'});
  };
  // salasanaa ei saa koskaan palauttaa API:sta
  delete user.password;
  res.json(user);
};


// PUT /api/Users/:id
// Käyttäjän tietojen päivitys
const putUserById = async (req, res) => {
  // req.params.id tulee URL:stä
  // req.body sisältää päivitettävät tiedot
  const updated = await (req.params.id);
  // jos käyttäjää ei löytynyt
  if (!updated) {
    return res.status(404).json({error: 'user not found'});
  };
  // salasanaa ei palauteta API:ssa
  delete updated.password;
  // palautetaan päivitetty käyttäjä
  res.json(updated);
};

// DELETE /api/Users/:id
// Poistetaan käyttäjä
const deleteUserById = async (req, res) => {
  // kutsutaan model-funktiota joka poistaa käyttäjän tietokannasta
  const deleted = await deleteUserById(req.params.id);
  // jos yhtään riviä ei poistettu
  if (!deleted) {
    return res.status(404).json({error: 'user not found'});
  }
  // onnistunut poisto
  res.json({message: 'user deleted'});
};

// Käyttäjän lisäys (rekisteröityminen)
// POST /api/Users
const postUser = async (pyynto, vastaus) => {
  const newUser = pyynto.body;
  // Uusilla käyttäjillä pitää olla kaikki vaaditut ominaisuudet tai palautetaan virhe
  if (!(newUser.username && newUser.password && newUser.email)) {
    return vastaus.status(400).json({error: 'required fields missing'});
  }
  // Lasketaan salasanasta tiiviste (hash)
  const hash = await bcrypt.hash(newUser.password, 10);
  // Korvataan selväkielinen salasana tiivisteellä ennen kantaan tallennusta
  newUser.password = hash;
  const newUserId = await addUser(newUser);
  vastaus.status(201).json({message: 'new user added', user_id: newUserId});
};




// POST /api/users/login
// Käyttäjän kirjautuminen
const postLogin = async (req, res) => {
  const {username, password} = req.body;
  // haetaan käyttäjä käyttäjänimen perusteella
  const user = await findUserByUsername(username);
  // jos käyttäjää ei löydy
  if (!user) {
    return res.status(404).json({error: 'user not found'});
  }
  // Verrataan salasanaa hashattuun versioon
  const passwordCorrect = await bcrypt.compare(password, user.password);
  // jos salasana ei ole oikea
  if (!passwordCorrect) {
    return res.status(403).json({error: 'invalid password'});
  }
  // poistetaan salasana ennen vastausta
  delete user.password;
  // luodaan JWT token
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  // vastaus onnistuneesta kirjautumisesta
  res.json({message: 'login ok', user, token});
};

// GET /api/users/me
// Palauttaa tokenissa olevan käyttäjän
const getMe = (req, res) => {
  res.json(req.user);
};

export {getUsers, postUser, postLogin, getUserById, putUserById, deleteUserById, getMe};