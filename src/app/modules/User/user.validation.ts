import { z } from 'zod';

// req validation
const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'rule is required',
    }),
    password: z.string().optional(),
  }),
});
//   await createUserZodSchema.parseAsync(req)

export const userValidation = {
  createUserZodSchema,
};
