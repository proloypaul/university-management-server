import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../User/user.model';
import { IloginUser } from './auth.interface';

const loginUserToDB = async (payload: IloginUser) => {
  const { id, password } = payload;

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exit');
  }
  if (
    isUserExist?.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect Password');
  }
};

export const AuthService = {
  loginUserToDB,
};
