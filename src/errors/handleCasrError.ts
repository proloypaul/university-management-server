import mongoose from 'mongoose';
import { errMessageGeneric } from '../interface/error';

const handleCasrError = (error: mongoose.Error.CastError) => {
  const errors: errMessageGeneric[] = [
    {
      path: error.path,
      message: `Invalid ${error.path}`,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'CastError',
    errorMessage: errors,
  };
};

export default handleCasrError;
