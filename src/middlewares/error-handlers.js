// tuodaan express-validatorin funktio
import {validationResult} from 'express-validator';

/**
* Custom middleware for handling and formatting validation errors
* @param {object} req - request object
* @param {object} res - response object
* @param {function} next - next function
* @return {*} next function call
*/
const validationErrorHandler = (req, res, next) => {
  // Kerätään express-validatorin tuottamat virheet
  const errors = validationResult(req, {strictParams: ['body']});
  // Jos virheitä löytyy
  if (!errors.isEmpty()) {
    // Luodaan uusi Error-objekti
    const error = new Error('Bad Request');
    error.status = 400;
    // Muokataan virhelista helpommin luettavaan muotoon
    error.errors = errors.array({onlyFirstError: true}).map((error) => {
      return {field: error.path, message: error.msg};
    });
    // Lähetetään virhe seuraavaan error middlewareen
    return next(error);
  }
  // Jos virheitä ei ole, jatketaan seuraavaan routeen
  next();
};

/**
 * Default middleware for 404 requests
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const notFoundHandler = (req, res, next) => {
  // Luodaan virhe
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  // Lähetetään virhe errorHandleriin
  next(error); // forward error to error handler
};
/**
* Custom default middleware for handling errors
*/
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500); // default is 500 if err.status is not defined
  // Palautetaan virhe JSON-muodossa
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
      errors: err.errors || ''
    }
  });
};


export {validationErrorHandler, notFoundHandler, errorHandler};