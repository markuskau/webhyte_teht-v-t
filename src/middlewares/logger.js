

const requestLogger = (req, res, next) => {
  console.log('Request', new Date().toLocaleString('fi-en'), req.method, req.url);
  if (req.body) {
    console.log('Body:', req.body);
  }
  next();
};

export default requestLogger;