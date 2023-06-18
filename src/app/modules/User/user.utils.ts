import { User } from './user.model';

export const findlastId = async () => {
  const UsersId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return UsersId?.id;
};

export const generatedUserId = async () => {
  const currentUserId = (await findlastId()) || (0).toString().padStart(5, '0');
  const incrementedId = (parseInt(currentUserId) + 1)
    .toString()
    .padStart(5, '0');

  return incrementedId;
};
