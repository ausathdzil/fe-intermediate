/** biome-ignore-all lint/suspicious/noExplicitAny: Demo */
'use server';

import { updateTag } from 'next/cache';
import { z } from 'zod';

import { db } from '@/db';
import { usersTable } from '@/db/schema';

export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const res = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error('Failed to login');
  }

  console.log(data);
}

const registerSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.email().max(255),
  password: z
    .string()
    .min(8)
    .max(255)
    .regex(/[A-Z]/)
    .regex(/[a-z]/)
    .regex(/[0-9]/)
    .regex(/[^A-Za-z0-9]/),
});

export async function register(_prevState: any, formData: FormData) {
  const rawFormData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const validatedFields = registerSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  await db
    .insert(usersTable)
    .values({ name, email, password })
    .returning({ id: usersTable.id });

  updateTag('users');
}
