import { Schema, model } from 'mongoose';
import {
  IacademicFaculty,
  academicFacultyModel,
} from './academicFaculty.interface';

const acamedicFacultySchema = new Schema<IacademicFaculty>(
  {
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const AcademicFaculty = model<IacademicFaculty, academicFacultyModel>(
  'AcademicFaculty',
  acamedicFacultySchema
);
