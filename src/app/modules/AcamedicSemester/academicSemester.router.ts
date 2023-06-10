import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicSemesterValidation } from './acamedicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
);

router.get('/', AcademicSemesterController.getAllAcademicSemester);

export const academicSemesterRouters = router;
