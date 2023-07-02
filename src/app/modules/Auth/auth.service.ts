import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../User/user.model';
import {
  ILoginUserResponse,
  IRefreshTokenResponse,
  IloginUser,
} from './auth.interface';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const loginUserToDB = async (
  payload: IloginUser
): Promise<ILoginUserResponse> => {
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

  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secrect as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifedToken = null;
  try {
    verifedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secrect as Secret
    );
  } catch (error) {
    throw new ApiError(StatusCodes.FORBIDDEN, 'Invalid refresh token');
  }

  const { userId } = verifedToken;

  const isUserExist = await User.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  const { id, role } = isUserExist;
  const newAccessToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUserToDB,
  refreshToken,
};
