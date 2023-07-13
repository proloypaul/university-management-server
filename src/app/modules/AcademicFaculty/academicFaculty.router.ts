import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcadmeicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcadmeicFacultyValidation.createAcademicFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicFacultyController.createAcademicFaculty
);

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  AcademicFacultyController.getSingleAcademicFaculty
);
router.patch(
  '/:id',
  validateRequest(AcadmeicFacultyValidation.updateAcademicSemesterZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  AcademicFacultyController.updateAcademicFaculty
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.deleteAcademicFaculty
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AcademicFacultyController.getAllAcademicFaculty
);

export const academicFacultyRouters = router;
