'use server';

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
  const email = formData.get('email');
  const password = formData.get('password');

  console.log(email, password);
}
