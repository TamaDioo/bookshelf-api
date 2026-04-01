import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
const port = process.env.PORT || 9000;
const host = '0.0.0.0';

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Bookshelf API',
    appName: process.env.APP_NAME || 'Nama App belum diset',
  });
});

app.use('/', routes);

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}`);
});