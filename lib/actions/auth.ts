import { z } from 'zod';

export const schemaRegisterUser = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be between 3 and 20 characters' })
    .max(50, {
      message: 'Username must be between 3 and 20 characters',
    })
    .refine((value) => !/\s/.test(value), {
      message: 'Username must not contain spaces',
    }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .max(1100),
});

export const schemaSignInUser = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be between 3 and 20 characters' })
    .max(50, {
      message: 'Username must be between 3 and 20 characters',
    })
    .refine((value) => !/\s/.test(value), {
      message: 'Username must not contain spaces',
    }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .max(1100),
});
