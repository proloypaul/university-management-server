import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constrains';
import { IacademicSemester } from './acamedicSemester.interface';
import { AcademicSemester } from './acamedicSemester.model';
import { IpaginationOptions } from '../../../interface/paginationInterface';
import { IGenericAcamedicSemesterResponse } from '../../../interface/commonInterface';

const createAcademicSemesterToDB = async (
  payLoad: IacademicSemester
): Promise<IacademicSemester> => {
  if (academicSemesterTitleCodeMapper[payLoad.title] !== payLoad.code) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Invalid semester code accepted code ${payLoad.title}: ${
        academicSemesterTitleCodeMapper[payLoad.title]
      }`
    );
  }
  const createAcademicSemester = await AcademicSemester.create(payLoad);
  return createAcademicSemester;
};

const getAllAcademicSemesterToDB = async (
  paginationOptions: IpaginationOptions
): Promise<IGenericAcamedicSemesterResponse<IacademicSemester[]>> => {
  const { page = 1, limit = 10 } = paginationOptions;

  const skip = (page - 1) * limit;

  const result = await AcademicSemester.find().sort().skip(skip).limit(limit);

  const totalAcadmicSemester = await AcademicSemester.countDocuments();

  return {
    meta: {
      page: page,
      limit: limit,
      total: totalAcadmicSemester,
    },
    data: result,
  };
};
export const academicSemesterService = {
  createAcademicSemesterToDB,
  getAllAcademicSemesterToDB,
};
