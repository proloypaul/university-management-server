import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IpaginationOptions } from '../../../interface/paginationInterface';
import {
  IacademicFaculty,
  IacademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyToDB = async (
  payload: IacademicFaculty
): Promise<IacademicFaculty | null> => {
  const result = await AcademicFaculty.create(payload);

  return result;
};

const getAllAcademicFacultyToDB = async (
  filters: Partial<IacademicFacultyFilters>,
  paginationOptions: IpaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;
  //   console.log('searchTerm value', searchTerm);
  const academicSemesterSearchAbleFields = ['title']; // here i don't add year search option
  const searchCondition = [];
  if (searchTerm) {
    searchCondition.push({
      $or: academicSemesterSearchAbleFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  // console.log(filtersData);
  if (Object.keys(filtersData).length) {
    searchCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const totalQueryOfAcademicSemesterData =
    searchCondition.length > 0 ? { $and: searchCondition } : {};
  const result = await AcademicFaculty.find(totalQueryOfAcademicSemesterData)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const totalAcadmicSemester = await AcademicFaculty.countDocuments(
    totalQueryOfAcademicSemesterData
  );

  return {
    meta: {
      page: page,
      limit: limit,
      total: totalAcadmicSemester,
    },
    data: result,
  };
};

const getSingleAcademicFacultyToDB = async (
  id: string
): Promise<IacademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);

  return result;
};

const updateAcademicFacultyToDB = async (
  id: string,
  updatedData: Partial<IacademicFaculty>
): Promise<IacademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: id },
    updatedData,
    { new: true }
  );
  return result;
};

// delete academic Semester
const deleteAcademicSemesterToDB = async (
  id: string
): Promise<IacademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);

  return result;
};

export const AcademicFacultyService = {
  createAcademicFacultyToDB,
  getAllAcademicFacultyToDB,
  getSingleAcademicFacultyToDB,
  updateAcademicFacultyToDB,
  deleteAcademicSemesterToDB,
};
