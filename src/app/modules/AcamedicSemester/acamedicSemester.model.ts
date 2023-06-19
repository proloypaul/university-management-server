import { Schema, model } from 'mongoose';
import {
  IacademicSemester,
  academicSemesterModel,
} from './acamedicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitels,
} from './academicSemester.constrains';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const acamedicSemestarSchema = new Schema<IacademicSemester>(
  {
    title: { type: String, required: true, enum: academicSemesterTitels },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: academicSemesterCodes },
    startMonth: { type: String, required: true, enum: academicSemesterMonths },
    endMonth: { type: String, required: true, enum: academicSemesterMonths },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
// here set some condition to  create academicSemester model
acamedicSemestarSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      StatusCodes.CONFLICT,
      'Academic semester is already exist!'
    );
  }
  next();
});

export const AcademicSemester = model<IacademicSemester, academicSemesterModel>(
  'AcademicSemester',
  acamedicSemestarSchema
);
