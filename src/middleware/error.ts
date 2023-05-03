import fs from 'fs';
import ApiError from '../utility/ApiError';
import { Request, NextFunction, Response } from 'express';

// export interface Error {
//   name: string;
//   statusCode: number;
//   status: string;
//   stack: any;
//   message: string;
// }

// شكل الايرور اللي عايزه يرجع ف الرسبونس لو انا شغال ف الديفلوبمنت كباك
const errorForDev = (err: ApiError, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack, // this tells me where did error happen.
  });
};

// لما اخلص المشروع دا شكل الداتا اللي المفروض هترجع للفرونت

const errorForProd = (err: ApiError, res: Response) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleTokenInvalid = () =>
  new ApiError('Invalid token, please login and try again', 401);

const handleTokenExpired = () =>
  new ApiError('Token expired, please login and try again', 401);

export const globalError = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.name === 'JsonWebTokenError') err = handleTokenInvalid();
  if (err.name === 'TokenExpiredError') err = handleTokenExpired();

  // if (req.file)
  //   fs.unlink(req.file?.path, err => {
  //     console.log(err);
  //   });

  if (process.env.NODE_ENV === 'development') return errorForDev(err, res);
  errorForProd(err, res);
};
