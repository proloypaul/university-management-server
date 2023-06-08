import express from 'express';
import { UserRouters } from '../modules/User/user.router';
import { academicSemesterRouters } from '../modules/AcamedicSemester/academicSemester.router';

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
];

moduleRoutes.forEach(routes => router.use(routes.path, routes.route));
// router.use('/users', UserRouters);
// router.use('/academic-semester', academicSemesterRouters);

export default router;
