import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUserToDB(loginData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User login Successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
