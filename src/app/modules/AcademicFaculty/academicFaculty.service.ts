import { IacademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyToDB = async (
  payload: IacademicFaculty
): Promise<IacademicFaculty | null> => {
  const result = await AcademicFaculty.create(payload);

  return result;
};

export const AcademicFacultyService = {
  createAcademicFacultyToDB,
};
