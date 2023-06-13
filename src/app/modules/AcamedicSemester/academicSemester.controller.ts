import { Request, Response } from 'express';
import { academicSemesterService } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IacademicSemester } from './acamedicSemester.interface';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
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
    // next(); it use to pass error in global handler to check error
    // res.status(200).json({
    //   success: true,
    //   message: 'Academic data created successfully',
    //   data: result,
    // });
  }
);
const getAllAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchTerm', 'title', 'year', 'code']); // both are constant we can declare them in constrain file
    const paginationOptions = pick(req.query, paginationFields);
    // console.log(paginationOptions);
    const result = await academicSemesterService.getAllAcademicSemesterToDB(
      filters,
      paginationOptions
    );

    sendResponse<IacademicSemester[]>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'get all academicSemester',
      meta: result.meta,
      data: result.data,
    });
    // next(); it use to pass error in global handler to check error
  }
);

const getAcademicSemesterSingleData = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await academicSemesterService.getAcademicSemesterSingleDataToDB(id);

    sendResponse<IacademicSemester>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'get single data of academicSemester',
      data: result,
    });

    // next(); it use to pass error in global handler to check error
  }
);

// update academic semester
const updateAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await academicSemesterService.updateAcademicSemesterToDB(
      id,
      updatedData
    );

    sendResponse<IacademicSemester>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic semester updated successfully',
      data: result,
    });

    // next(); it use to pass error in global handler to check error
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getAcademicSemesterSingleData,
  updateAcademicSemester,
};
