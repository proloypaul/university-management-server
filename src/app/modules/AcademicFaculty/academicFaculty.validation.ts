import { z } from 'zod';

const createAcademicFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

const updateAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title is required',
    }),
  }),
});

export const AcadmeicFacultyValidation = {
  createAcademicFacultyZodSchema,
  updateAcademicSemesterZodSchema,
};
