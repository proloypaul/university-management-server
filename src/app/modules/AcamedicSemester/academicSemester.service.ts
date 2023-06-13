import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCodeMapper } from './academicSemester.constrains';
import {
  IacademicSemester,
  IacademicSemesterFilters,
} from './acamedicSemester.interface';
import { AcademicSemester } from './acamedicSemester.model';
import { IpaginationOptions } from '../../../interface/paginationInterface';
import { IGenericAcamedicSemesterResponse } from '../../../interface/commonInterface';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';

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
  filters: IacademicSemesterFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericAcamedicSemesterResponse<IacademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const { searchTerm, ...filtersData } = filters;
  const academicSemesterSearchAbleFields = ['title', 'code']; // here i don't add year search option
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
  const result = await AcademicSemester.find(totalQueryOfAcademicSemesterData)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

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

const getAcademicSemesterSingleDataToDB = async (
  id: string
): Promise<IacademicSemester | null> => {
  const result = await AcademicSemester.findById(id);

  return result;
};

// update acamdemic semester
const updateAcademicSemesterToDB = async (
  id: string,
  updatedData: Partial<IacademicSemester>
): Promise<IacademicSemester | null> => {
  if (
    updatedData.title &&
    updatedData.code &&
    academicSemesterTitleCodeMapper[updatedData.title] !== updatedData.code
  ) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Invalid semester code accepted code ${updatedData.title}: ${
        academicSemesterTitleCodeMapper[updatedData.title]
      }`
    );
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    updatedData,
    { new: true }
  );
  return result;
};

// delete academic Semester
const deleteAcademicSemesterToDB = async (
  id: string
): Promise<IacademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);

  return result;
};

export const academicSemesterService = {
  createAcademicSemesterToDB,
  getAllAcademicSemesterToDB,
  getAcademicSemesterSingleDataToDB,
  updateAcademicSemesterToDB,
  deleteAcademicSemesterToDB,
};
