import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const reqData = req.body;
    const result = await AcademicFacultyService.createAcademicFacultyToDB(
      reqData
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Created AcademicFaculty successfully',
      data: result,
    });
  }
);

export const AcademicFacultyController = {
  createAcademicFaculty,
};
