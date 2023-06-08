import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import { NextFunction, Request, Response } from 'express';

const createUserToDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userData } = req.body;
    const result = await UserService.createUser(userData);
    next();
    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  }
);

export const UserController = {
  createUserToDB,
};
