import { SortOrder } from 'mongoose';
import { IpaginationOptions } from '../interface/paginationInterface';

type IoptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};
const calculatePagination = (options: IpaginationOptions): IoptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  // calculate total limit in one page
  const skip = (1 - page) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};
