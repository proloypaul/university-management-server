import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createUserToDB = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);

  // res.status(200).json({
  //   success: true,
  //   message: 'User created successfully',
  //   data: result,
  // });

  // optimize code
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
  // next(); it use to pass error in global handler to check error
});

export const UserController = {
  createUserToDB,
};
