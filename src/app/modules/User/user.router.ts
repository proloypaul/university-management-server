import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { userValidation } from './user.validation';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(userValidation.createStudentZodSchema),
  UserController.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(userValidation.createFacultyZodSchema),
  UserController.createFaculty
);

router.post(
  '/create-admin',
  validateRequest(userValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRouters = router;
