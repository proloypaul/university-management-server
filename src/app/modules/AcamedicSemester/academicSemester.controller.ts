import { NextFunction, Request, Response } from 'express';
import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterService.createAcademicSemesterToDB(
      academicSemesterData
    );
    next();
    res.status(200).json({
      success: true,
      message: 'Academic data created successfully',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
};
