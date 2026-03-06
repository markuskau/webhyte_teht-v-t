// Tuodaan JWT kirjasto tokenin tarkistamiseen
import jwt from 'jsonwebtoken';
// Ladataan ympäristömuuttujat .env tiedostosta
import 'dotenv/config';

// Middleware joka tarkistaa JWT tokenin
const authenticateToken = (req, res, next) => {
  // Authentikaatio header
  const authHeader = req.headers['authorization'];
  // Otetaan token talteen
  const token = authHeader && authHeader.split(' ')[1];
  // jos tokenia ei ole
  if (token == undefined) {
    return res.sendStatus(401); // Unauthorized
  }
  try {
    // tarkistetaan token ja puretaan payload
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    // siirrytään seuraavaan middlewareen
    next();
  } catch (error) {
    // jos token on virheellinen tai vanhentunut
    console.log('token verification failed', error);
    res.status(403).send({message: 'invalid token'});
  }
};

export {authenticateToken};