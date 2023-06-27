import { IacademicSemester } from '../AcamedicSemester/acamedicSemester.interface';
import { User } from './user.model';

export const findUserLastId = async () => {
  const UsersId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return UsersId?.id;
};

export const generatedUserId = async () => {
  const currentUserId =
    (await findUserLastId()) || (0).toString().padStart(5, '0');
  const incrementedId = (parseInt(currentUserId) + 1)
    .toString()
    .padStart(5, '0');
  return incrementedId;
};

// generate student id
export const findStudentLastId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined;
};

export const generatedStudentId = async (
  academicSemesterData: IacademicSemester | null
): Promise<string> => {
  const currentUserId =
    (await findStudentLastId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentUserId) + 1).toString().padStart(5, '0');

  if (academicSemesterData) {
    incrementedId = `${academicSemesterData.year.toString().substring(2)}${
      academicSemesterData.code
    }${incrementedId}`;
  }

  return incrementedId;
};

// generate faculty id
export const findFacultyLastId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined;
};

export const generatedFacultyId = async (): Promise<string> => {
  const currentUserId =
    (await findFacultyLastId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentUserId) + 1).toString().padStart(5, '0');

  incrementedId = `F-${incrementedId}`;

  return incrementedId;
};

// generate admin id
export const findLastAdminId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateAdminId = async (): Promise<string> => {
  const currentId =
    (await findLastAdminId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `A-${incrementedId}`;

  return incrementedId;
};
