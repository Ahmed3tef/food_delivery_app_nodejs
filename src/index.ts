import express, { NextFunction, Request, Response } from 'express';

import { PORT } from './config';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { adminRoutes, vendorRoutes } from './routes';
import ApiError from './utility/ApiError';
import mongoSanitize from 'express-mongo-sanitize';
import { globalError } from './middleware/error';

dotenv.config({ path: '../config.env' });

const app = express();

app.use(cors());

app.use(mongoSanitize());

app.use(express.json());
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/admin', adminRoutes);
app.use('/vendor', vendorRoutes);

// route doesn't match
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`));
});

// error handler middleware
app.use(globalError);

//   await dbConnection();

//   await App(app);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
// };

// StartServer();
