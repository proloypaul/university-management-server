import { Model } from 'mongoose';

export type IacademicSemesterCodes = '01' | '02' | '03';
export type IacademicSemesterTitles = 'Autum' | 'Summer' | 'Fall';
export type IacademicSemesterMonths =
  | 'January'
  | 'Fabruary'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IacademicSemester = {
  title: IacademicSemesterTitles;
  year: number;
  code: IacademicSemesterCodes;
  startMonth: IacademicSemesterMonths;
  endMonth: IacademicSemesterMonths;
};

export type academicSemesterModel = Model<
  IacademicSemester,
  Record<string, unknown>
>;
