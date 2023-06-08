import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicSemesterValidation } from './acamedicSemester.validation';
const router = express.Router();

router.post(
  '/create-academicSemester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema)
);

export const UserRouters = router;
