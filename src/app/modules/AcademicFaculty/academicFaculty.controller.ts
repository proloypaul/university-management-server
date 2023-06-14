import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { AcademicFacultyService } from './academicFaculty.service';
import { IacademicFaculty } from './academicFaculty.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

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

const getAllAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, ['searchTerm', 'title']);
    const paginationOptions = pick(req.query, paginationFields);
    // console.log(filters);
    const result = await AcademicFacultyService.getAllAcademicFacultyToDB(
      filters,
      paginationOptions
    );

    sendResponse<IacademicFaculty[] | null>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'get all academic faculty successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.getSingleAcademicFacultyToDB(
      id
    );

    sendResponse<IacademicFaculty>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'get single data of academicFaculty',
      data: result,
    });

    // next(); it use to pass error in global handler to check error
  }
);

const updateAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await AcademicFacultyService.updateAcademicFacultyToDB(
      id,
      updatedData
    );

    sendResponse<IacademicFaculty>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic faculty updated successfully',
      data: result,
    });

    // next(); it use to pass error in global handler to check error
  }
);

const deleteAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicFacultyService.deleteAcademicSemesterToDB(id);

    sendResponse<IacademicFaculty>(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Academic Faculty Deleted successfully',
      data: result,
    });
  }
);
export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
