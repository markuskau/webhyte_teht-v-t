// HUOM: mokkidata on poistettu modelista
//import users from '../models/user-model.js';

import {findAllUsers, findUserById, findUserByUsername} from '../models/user-model.js';


// TODO: lisää tietokantafunktiot user modeliin
// ja käytä niitä täällä

// TODO: refaktoroi tietokantafunktiolle
const getUsers = async (req, res) => {
  const users = await findAllUsers();
  // ÄLÄ IKINÄ lähetä salasanoja
  users.forEach((user) => {
    delete user.password;
  });
  res.json(users);
};
// TODO: getUserById
const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (!user) {
    return res.status(404).json({error: 'user not found'});
  };
  delete user.password;
  res.json(user);
};
// TODO: putUserById

// TODO: deleteUserById

// Käyttäjän lisäys (rekisteröityminen)
// TODO: refaktoroi tietokantafunktiolle
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
  // console.log('users', users);
  vastaus.status(201).json({message: 'new user added', user_id: newId});
};


// Tietokantaversio valmis
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

export {getUsers, postUser, postLogin};