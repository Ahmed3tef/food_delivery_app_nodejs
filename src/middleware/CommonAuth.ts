import { Request, NextFunction, Response } from 'express';
import { tokenInput } from '../dto';
import { ValidateToken } from '../utility/PasswordUnility';

declare global {
  namespace Express {
    interface Request {
      user?: tokenInput;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signature = ValidateToken(req);
  if (signature) {
    return next();
  } else {
    return res.json({ message: 'User Not authorised' });
  }
};
