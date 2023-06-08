import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constrains';
import { IacademicSemester } from './acamedicSemester.interface';
import { AcademicSemester } from './acamedicSemester.model';

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

export const academicSemesterService = {
  createAcademicSemesterToDB,
};
