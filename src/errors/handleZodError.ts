import { ZodError, ZodIssue } from 'zod';
import { errMessageGeneric } from '../interface/error';
import { IGenericErrorRespose } from '../interface/commonInterface';

const handleZodError = (error: ZodError): IGenericErrorRespose => {
  const errors: errMessageGeneric[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length],
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: 'ZodError',
    errorMessage: errors,
  };
};
export default handleZodError;
