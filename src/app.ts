import express, { Application } from 'express';
import cors from 'cors';
import { UserRouters } from './app/modules/User/user.router';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import { academicSemesterRouters } from './app/modules/AcamedicSemester/academicSemester.router';

const app: Application = express();
app.use(cors());
//parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const port = 3000

// to set NODE Environment using command //set NODE_ENV= production && npm run start

// application routes
app.use('/api/v1/users/', UserRouters);
app.use('/api/v1/academic-semester', academicSemesterRouters);

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Hello World!')
//   throw new Error('Testing Error loger') // it will be work on development environment
//   // throw new ApiError(400, 'Orebaba Error') // it will be work on production enviroment

//   // we can also use next function in production enviroment for Error handling
//   // next('Ore baba Error')
//   // Promise.reject('Unhandle Promise rejection')
// })

// global error handler
app.use(globalErrorHandler);

export default app;
