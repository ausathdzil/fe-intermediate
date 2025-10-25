/** biome-ignore-all lint/suspicious/noExplicitAny: Demo */
'use server';

import { updateTag } from 'next/cache';
import { z } from 'zod';

import { db } from '@/db';
import { usersTable } from '@/db/schema';

const loginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export async function login(formData: FormData) {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const validatedFields = loginSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    throw new Error(
      JSON.stringify(z.flattenError(validatedFields.error).fieldErrors)
    );
  }

  const { email, password } = validatedFields.data;

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

export type RegisterFormState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[] | undefined;
    email?: string[] | undefined;
    password?: string[] | undefined;
  };
  fields: {
    name: string;
    email: string;
    password: string;
  };
};

const registerSchema = z.object({
  name: z.string().min(10).max(255),
  email: z.email().max(255),
  password: z.string().min(8).max(255),
});

export async function register(
  _prevState: RegisterFormState,
  formData: FormData
) {
  const rawFormData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const validatedFields = registerSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    const fieldErrors = z.flattenError(validatedFields.error).fieldErrors;
    return {
      success: false,
      message: '',
      errors: z.flattenError(validatedFields.error).fieldErrors,
      fields: {
        name: fieldErrors.name ? '' : rawFormData.name,
        email: fieldErrors.email ? '' : rawFormData.email,
        password: fieldErrors.password ? '' : rawFormData.password,
      },
    };
  }

  const { name, email, password } = validatedFields.data;

  try {
    await db
      .insert(usersTable)
      .values({ name, email, password })
      .returning({ id: usersTable.id });

    updateTag('users');
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Something went wrong';

    return {
      success: false,
      message,
      fields: rawFormData,
    };
  }

  return {
    success: true,
    message: 'User created successfully',
    fields: {
      name: '',
      email: '',
      password: '',
    },
  };
}
