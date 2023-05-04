import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_SECRET_EXPIRATION } from '../config';
import { tokenInput } from '../dto';

// import { VendorPayload } from '../dto';
// import { AuthPayload } from '../dto/Auth.dto';

declare global {
  namespace Express {
    interface Request {
      user?: tokenInput;
    }
  }
}

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt);
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};

export const GenerateToken = (payload: tokenInput) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_SECRET_EXPIRATION,
  });
};

export const ValidateToken = (req: Request) => {
  // will be bearer token
  const token = req.get('Authorization');

  if (token) {
    try {
      const payload = jwt.verify(token.split(' ')[1], JWT_SECRET) as tokenInput;
      req.user = payload;
      //   console.log(payload);
      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
};
