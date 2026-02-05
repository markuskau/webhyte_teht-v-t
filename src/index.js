import express from 'express';
import cors from 'cors';
import itemRouter from './routes/itemRouter.js';
import userRouter from './routes/userRouter.js';
import requestLogger from './middlewares/logger.js';
import entryRouter from './routes/entryRouter.js';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// parsitaan json data pyynnöstä ja lisätään request-objektiin
app.use(express.json());

// tarjoillaan webbisivusto (front-end) palvelimen juuressa
app.use('/', express.static('public'));

// Oma loggari määritelmä
app.use(requestLogger);

// API root
app.get('/api', (req, res) => {
  res.send('This is dummy items API!');
});


app.use('/api/users', userRouter);
// diary entries resource
app.use('/api/entries', entryRouter);


app.use('/api/items', itemRouter);


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
