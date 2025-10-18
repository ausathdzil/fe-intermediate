'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
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

export async function register(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  await db
    .insert(usersTable)
    .values({ name, email, password })
    .returning({ id: usersTable.id });

  revalidatePath('/users');
  revalidateTag('users');
}
