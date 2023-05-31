import { Request, Response } from 'express'
import userService from './user.service'

const createUserToDB = async (req: Request, res: Response) => {
  try {
    const { userData } = req.body
    const result = await userService.createUser(userData)

    res.status(200).json({
      success: true,
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Failed to create user error message ${error}`,
    })
  }
}

export default {
  createUserToDB,
}
