'use client';

import { login } from '@/lib/actions';

export default function Login() {
  return (
    <main className="font-sans flex flex-col gap-4 items-center justify-center h-screen">
      <form action={login}>
        <input type="text" name="email" placeholder="m@example.com" />
        <input type="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </main>
  );
}
