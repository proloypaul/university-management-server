import { RequestHandler } from 'express';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = async (req, res, next) => {
  try {
    const { ...academicSemesterData } = req.body;
    const result = await academicSemesterService.createAcademicSemesterToDB(
      academicSemesterData
    );

    res.status(200).json({
      success: true,
      message: 'Academic data created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  createAcademicSemester,
};
