import { RequestHandler } from 'express';
import { UserService } from './user.service';

const createUserToDB: RequestHandler = async (req, res, next) => {
  try {
    const { userData } = req.body;
    const result = await UserService.createUser(userData);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error) {
    // res.status(400).json({
    //   success: false,
    //   message: `Failed to create user error message ${error}`,
    // })
    next(error);
  }
};

export const UserController = {
  createUserToDB,
};
