import { Request, Response, NextFunction } from 'express';
import { loginInput } from '../dto';
import { FAIL_STATUS, SUCCESS_STATUS } from '../utility/consts';
import { ValidatePassword } from '../utility/PasswordUnility';
import ApiError from '../utility/ApiError';
// import asyncHandler from 'express-async-handler';

export const loginHandler =
  (Model: any) => async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <loginInput>req.body;
    const existingUser = await Model.findOne({ email });
    // 1- email doesn't exist
    if (!existingUser) {
      return next(new ApiError('User not found, please sign up first.', 404));
    }

    if (!!existingUser) {
      // 2- email or pass is incorrect

      const validation = await ValidatePassword(
        password,
        existingUser.password,
        existingUser.salt
      );
      if (!validation) {
        return next(new ApiError('Incorrect email or password', 401));
      } else {
        // 3- all is good
        res.status(200).json({
          status: SUCCESS_STATUS,
          data: existingUser,
        });
      }
    }
  };
