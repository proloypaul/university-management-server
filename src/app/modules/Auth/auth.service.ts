import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { User } from '../User/user.model';
import {
  ILoginUserResponse,
  IPasswordChangeData,
  IRefreshTokenResponse,
  IloginUser,
} from './auth.interface';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { JwtPayload, Secret } from 'jsonwebtoken';

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

const changePasswrodToDB = async (
  user: JwtPayload | null,
  passwordData: IPasswordChangeData
) => {
  const { oldPassword, newPassword } = passwordData;

  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  ); // here .select('+password') use for show the password
  // check user exist or not
  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'User does not exist');
  }

  // check user oldPassword Match or not
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, 'Old password is incorrect');
  }

  // another way to changePassword update

  // // hash password before saving
  // const newHashedPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_salt_rounds)
  // );

  // const query = { id: user?.userId };
  // const updatedData = {
  //   password: newHashedPassword,  //
  //   needsPasswordChange: false,
  //   passwordChangedAt: new Date(), //
  // };

  // await User.findOneAndUpdate(query, updatedData);
  // another way finished here

  // update user according to user given newPassword
  isUserExist.password = newPassword;
  isUserExist.needsPasswordChange = false;
  // updating using save
  isUserExist.save();
};

export const AuthService = {
  loginUserToDB,
  refreshToken,
  changePasswrodToDB,
};
