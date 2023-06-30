import express from 'express';
import { UserRouters } from '../modules/User/user.router';
import { academicSemesterRouters } from '../modules/AcamedicSemester/academicSemester.router';
import { academicFacultyRouters } from '../modules/AcademicFaculty/academicFaculty.router';
import { academicDepartmentRoutes } from '../modules/AcademicDepartment/academicDepartment.router';
import { StudentRoutes } from '../modules/Student/student.router';
import { FacultyRoutes } from '../modules/faculty/faculty.router';
import { AdminRoutes } from '../modules/Admin/admin.router';
import { AuthRouters } from '../modules/Auth/auth.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRouters,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRouters,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/auth',
    route: AuthRouters,
  },
];

moduleRoutes.forEach(routes => router.use(routes.path, routes.route));
// router.use('/users', UserRouters);
// router.use('/academic-semester', academicSemesterRouters);

export default router;
