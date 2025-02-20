import {
  IacademicSemesterCodes,
  IacademicSemesterMonths,
  IacademicSemesterTitles,
} from './acamedicSemester.interface';

export const academicSemesterMonths: IacademicSemesterMonths[] = [
  'January',
  'Fabruary',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitels: IacademicSemesterTitles[] = [
  'Autum',
  'Summer',
  'Fall',
];
export const academicSemesterCodes: IacademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autum: '01',
  Summer: '02',
  Fall: '03',
};
