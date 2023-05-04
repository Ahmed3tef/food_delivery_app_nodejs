import { check } from 'express-validator';
import { validationMiddleware } from '../middleware/validation';

// import { UserModel } from '../../models/user.js';

export const signupValidation = [
  check('name')
    .notEmpty()
    .withMessage('User required')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Too short User name'),
  check('email')
    .notEmpty()
    .withMessage('Email required')
    .trim()
    .isEmail()
    .withMessage('Invalid email address'),
  //   .custom(val =>
  //     UserModel.findOne({ email: val }).then(user => {
  //       if (user) {
  //         return Promise.reject(new Error('E-mail already used'));
  //       }
  //     })
  // )
  check('password')
    .notEmpty()
    .withMessage('Password required')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation incorrect');
      }
      return true;
    }),

  check('passwordConfirm')
    .notEmpty()
    .withMessage('Password confirmation required')
    .trim(),

  check('phone')
    .notEmpty()
    .trim()
    .isMobilePhone(['ar-EG', 'ar-SA'])
    .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),

  validationMiddleware,
];

export const loginValidation = [
  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address'),
  check('password').trim().notEmpty().withMessage('Password required'),
  // .isLength({ min: 6 })
  // .withMessage('Password must be at least 6 characters'),
  validationMiddleware,
];

export const forgotPasswordValidation = [
  check('email')
    .notEmpty()
    .withMessage('Email required')
    .trim()
    .isEmail()
    .withMessage('Invalid email address'),

  validationMiddleware,
];

export const verifyCodeValidation = [
  check('email')
    .notEmpty()
    .withMessage('Email required')
    .trim()
    .isEmail()
    .withMessage('Invalid email address'),
  check('resetCode')
    .trim()
    .notEmpty()
    .withMessage('resetCode required')
    .isLength({ min: 6, max: 6 })
    .withMessage('ResetCode must be 6 characters.'),

  validationMiddleware,
];

export const resetPasswordValidation = [
  check('email')
    .notEmpty()
    .withMessage('Email required')
    .trim()
    .isEmail()
    .withMessage('Invalid email address'),
  check('passwordConfirm')
    .trim()
    .notEmpty()
    .withMessage('Password confirmation required'),
  check('password')
    .notEmpty()
    .withMessage('Password required')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error('Password Confirmation incorrect');
      }
      return true;
    }),

  validationMiddleware,
];
