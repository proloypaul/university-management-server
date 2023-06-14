import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcadmeicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcadmeicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);

export const academicFacultyRouters = router;
