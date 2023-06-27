import { Model, Types } from 'mongoose';
import { IStudent } from '../Student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../Admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};
export type UserModel = Model<IUser, Record<string, unknown>>;
