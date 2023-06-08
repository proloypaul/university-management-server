import { IacademicSemester } from './acamedicSemester.interface';
import { AcademicSemester } from './acamedicSemester.model';

const createAcademicSemesterToDB = async (
  payLoad: IacademicSemester
): Promise<IacademicSemester> => {
  const createAcademicSemester = await AcademicSemester.create(payLoad);
  return createAcademicSemester;
};

export const academicSemesterService = {
  createAcademicSemesterToDB,
};
