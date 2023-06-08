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
  }
);

export const AcademicSemester = model<IacademicSemester, academicSemesterModel>(
  'AcademicSemester',
  acamedicSemestarSchema
);
