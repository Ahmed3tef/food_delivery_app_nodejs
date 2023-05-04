import fs from 'fs';
import { apiError } from '../utility/ApiError';
import { Request, NextFunction, Response } from 'express';

// export interface Error {
//   name: string;
//   statusCode: number;
//   status: string;
//   stack: any;
//   message: string;
// }

// شكل الايرور اللي عايزه يرجع ف الرسبونس لو انا شغال ف الديفلوبمنت كباك
const errorForDev = (err: apiError, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack, // this tells me where did error happen.
  });
};

// لما اخلص المشروع دا شكل الداتا اللي المفروض هترجع للفرونت

const errorForProd = (err: apiError, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

export const globalError = (
  err: apiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.name === 'JsonWebTokenError') {
    err.statusCode = 401;
    err.message = 'Invalid token, please login and try again';
  }
  if (err.name === 'TokenExpiredError') {
    err.statusCode = 401;
    err.message = 'Token expired, please login and try again';
  }

  // if (req.file)
  //   fs.unlink(req.file?.path, err => {
  //     console.log(err);
  //   });

  if (process.env.NODE_ENV === 'development') return errorForDev(err, res);
  errorForProd(err, res);
};
