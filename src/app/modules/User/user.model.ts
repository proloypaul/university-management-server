/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0, // this option hide my password, don't show my password in front end
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    // toJSON: {
    //   virtuals: true,
    // },
  }
);

userSchema.pre('save', async function (next) {
  // hashing user password
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);

// use of static method
userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<
  IUser,
  'id' | 'password' | 'role' | 'needsPasswordChange'
> | null> {
  const user = await User.findOne(
    { id },
    { id: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );

  return user;
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savePassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(givenPassword, savePassword);
  return isMatch;
};

// use of instance method

// userSchema.methods.isUserExist = async function (
//   id: string
// ): Promise<Partial<IUser | null>> {
//   const user = await User.findOne(
//     { id },
//     { id: 1, password: 1, needsPasswordChange: 1 }
//   );

//   return user;
// };

// userSchema.methods.isPasswordMatched = async function (
//   givenPassword: string,
//   savePassword: string
// ): Promise<boolean> {
//   const isMatch = await bcrypt.compare(givenPassword, savePassword);
//   return isMatch;
// };
