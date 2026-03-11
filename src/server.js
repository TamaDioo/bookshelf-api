import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
const port = 9000;
const host = 'localhost';

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});