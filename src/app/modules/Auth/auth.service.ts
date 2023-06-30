import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../User/user.model';
import { IloginUser } from './auth.interface';

const loginUserToDB = async (payload: IloginUser) => {
  const { id, password } = payload;

  const user = new User();

  const isUserExist = await user.isUserExist(id);

  if (
    isUserExist?.password &&
    !(await user.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect Password');
  }
};

export const AuthService = {
  loginUserToDB,
};
