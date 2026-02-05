//import users from '../models/userModel.js';
import { findUserByUsername } from "../models/userModel.js";



const getUsers = (req, response) => {
  // ÄLÄ IKINÄ lähetä salasanoja HTTP-vastauksessa
  for (let i = 0; i < users.length; i++) {
    delete users[i].password;
    // kaikki emailit sensuroitu esimerkki
    // users[i].email = 'sensored';
  }
  response.json(users);
};

// TODO: getUserById
const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({error: 'user not found'});
  }
};
// TODO: putUserById
const putUserById = (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === 1) {
    return res.status(404).json({error: 'user not found'});
  }
};
// TODO: deleteUserById
const deleteUserById = (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({error: 'user not found'});
  }
};

// Käyttäjän lisäys (rekisteröityminen)
const postUser = (pyynto, vastaus) => {
  const newUser = pyynto.body;
  // Uusilla käyttäjillä pitää olla kaikki vaaditut ominaisuudet tai palautetaan virhe
  // itse koodattu erittäin yksinkertainen syötteen validointi
  if (!(newUser.username && newUser.password && newUser.email)) {
    return vastaus.status(400).json({error: 'required fields missing'});
  }

  // HUOM: ÄLÄ ikinä loggaa käyttäjätietoja ensimmäisten pakollisten testien jälkeen!!! (tietosuoja)
  //console.log('registering new user', newUser);
  const newId = users[users.length - 1].id + 1;
  // luodaan uusi objekti, joka sisältää id-ominaisuuden ja kaikki newUserObjektin
  // ominaisuudet ja lisätään users-taulukon loppuun
  users.push({id: newId, ...newUser});
  delete newUser.password;
  console.log('users', users);
  vastaus.status(201).json({message: 'new user added', user_id: newId});
};

//Tietokanta versio:
const postLogin = (req, res) => {
  const {username, password} = req.body;
  // haetaan käyttäjä-objekti käyttäjän nimen perusteella
  const user = findUserByUsername(username);
  if (user) {
    if (user.password === password) {
      delete user.password;
      return res.json({message: 'login ok', user: username});
    }
    return res.status(403).json({error: 'invalid password'});
  }
  res.status(404).json({error: 'user not found'});
};

export {
  deleteUserById,
  getUserById,
  getUsers,
  postLogin,
  postUser,
  putUserById,
};
