import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import routes from './app/routes';
import { StatusCodes } from 'http-status-codes';
import cookieParser from 'cookie-parser';

const app: Application = express();
app.use(cors());
app.use(cookieParser());
//parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const port = 3000

// to set NODE Environment using command //set NODE_ENV= production && npm run start

// application routes
// app.use('/api/v1/users/', UserRouters);
// app.use('/api/v1/academic-semester', academicSemesterRouters);
app.use('/api/v1', routes);

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

// handle Not Found Api
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api Not Found',
      },
    ],
  });
  next();
});

export default app;
