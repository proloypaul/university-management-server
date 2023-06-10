import { errMessageGeneric } from './error';

export type IGenericAcamedicSemesterResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorRespose = {
  statusCode: number;
  message: string;
  errorMessage: errMessageGeneric[];
};
