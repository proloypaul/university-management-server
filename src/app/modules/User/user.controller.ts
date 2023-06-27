import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await UserService.createStudentToDB(student, userData);

  // res.status(200).json({
  //   success: true,
  //   message: 'User created successfully',
  //   data: result,
  // });

  // optimize code
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'student as user created successfully',
    data: result,
  });
  // next(); it use to pass error in global handler to check error
});

// create faculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;
  const result = await UserService.createFacultyToDB(faculty, userData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty as user created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { admin, ...userData } = req.body;
  const result = await UserService.createAdminToDB(admin, userData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin as user created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
