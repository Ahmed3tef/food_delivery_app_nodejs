import express from 'express';
import { appRoutes } from './services/ExpressApp';
import { PORT } from './config';
import dotenv from 'dotenv';
import ApiError from './utility/ApiError';
import { globalError } from './middleware/error';
import { dbConnection } from './utility/dbConnection';

dotenv.config({ path: '../config.env' });

const app = express();

// error handler middleware
app.use(globalError);

// db connection
dbConnection();

// routes handler
appRoutes(app);

// connect to server
const server = app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
// };

// handle rejections (errors from outside express)

process.on('unhandledRejection', (err: ApiError) => {
  console.error(
    `unhandledRejection Error happened: ${err.name} | ${err.message}`
  );

  server.close(err => {
    console.log('server is shutting down...');
    process.exit(1);
  });
});
