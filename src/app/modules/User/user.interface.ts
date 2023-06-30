import { Model, Types } from 'mongoose';
import { IStudent } from '../Student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../Admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: true | false;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

// static method using instance
// export type IUserMethods = {
//   isUserExist(id: string): Promise<Partial<IUser> | null>;
//   isPasswordMatched(
//     givenPassword: string,
//     savePassword: string
//   ): Promise<boolean>;
// };

//another way to create static method

export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
  isPasswordMatched(
    givenPassword: string,
    savePassword: string
  ): Promise<boolean>;
} & Model<IUser>;

// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;
