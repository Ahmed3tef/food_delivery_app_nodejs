import express, { Request, Response, NextFunction } from 'express';
import { loginHandler } from './auth';
import { Vendor } from '../models';

export const vendorLogin = loginHandler(Vendor);
