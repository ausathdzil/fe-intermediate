'use client';

import { useActionState } from 'react';

import { register } from '@/lib/actions';

export default function Register() {
  const [state, formAction, pending] = useActionState(register, undefined);

  return (
    <main className="font-sans flex flex-col gap-4 items-center justify-center h-screen">
      <form action={formAction}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="John Doe"
            type="text"
            name="name"
            required
            maxLength={255}
          />
          {state?.errors.name && <p>{state.errors.name[0]}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="m@example.com"
            type="email"
            name="email"
            required
            maxLength={255}
          />
          {state?.errors.email && <p>{state.errors.email[0]}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            minLength={8}
            maxLength={255}
          />
          {state?.errors.password && <p>{state.errors.password[0]}</p>}
        </div>
        <button disabled={pending} type="submit">
          Register
        </button>
      </form>
    </main>
  );
}
