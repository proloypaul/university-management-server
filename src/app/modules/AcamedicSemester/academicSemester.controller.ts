import { NextFunction, Request, Response } from 'express';
import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IacademicSemester } from './acamedicSemester.interface';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterService.createAcademicSemesterToDB(
      academicSemesterData
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic data created successfully',
      data: result,
    });
    next();
    // res.status(200).json({
    //   success: true,
    //   message: 'Academic data created successfully',
    //   data: result,
    // });
  }
);
const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationFields);
    // console.log(paginationOptions);
    const result = await academicSemesterService.getAllAcademicSemesterToDB(
      paginationOptions
    );

    sendResponse<IacademicSemester[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'get all academicSemester',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
};
