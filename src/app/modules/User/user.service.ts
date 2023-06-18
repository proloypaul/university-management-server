import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generatedUserId } from './user.utils';

const createUser = async (userData: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const generatedId = await generatedUserId();
  userData.id = generatedId;
  // default password
  if (!userData.password) {
    userData.password = config.default_user_pass as string;
  }
  const user = await User.create(userData);
  if (!user) {
    throw new ApiError(400, 'Failed to create new user!');
  }

  return user;
};

export const UserService = {
  createUser,
};
