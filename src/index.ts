import type { Express } from 'express';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import appRouter from './common/router';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());
app.use(cors());

app.use('/', appRouter);

app.listen(PORT, () => {
  console.info(`[server]: Server is running at http://localhost:${PORT}`);
});
