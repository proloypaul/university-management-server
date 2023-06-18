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

router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/:id',
  validateRequest(AcadmeicFacultyValidation.updateAcademicSemesterZodSchema),
  AcademicFacultyController.updateAcademicFaculty
);
router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty);
router.get('/', AcademicFacultyController.getAllAcademicFaculty);

export const academicFacultyRouters = router;
