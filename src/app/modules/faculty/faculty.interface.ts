import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../AcademicDepartment/academicDepartment.interface';
import { IacademicFaculty } from '../AcademicFaculty/academicFaculty.interface';

export type UserName = {
  firstName: string;
  lastName: string;
  middleName: string;
};

export type IFaculty = {
  id: string;
  name: UserName;
  profileImage: string;
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender?: 'male' | 'female';
  permanentAddress?: string;
  presentAddress?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IacademicFaculty;
  designation: string;
};

export type FacultyModel = Model<IFaculty, Record<string, unknown>>;
