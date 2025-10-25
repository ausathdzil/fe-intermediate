/** biome-ignore-all lint/suspicious/noArrayIndexKey: Demo */
'use client';

import { useActionState } from 'react';

import { register, RegisterFormState } from '@/lib/actions';

const initialState: RegisterFormState = {
  success: false,
  message: '',
  errors: undefined,
  fields: {
    name: '',
    email: '',
    password: '',
  },
};

export default function Register() {
  const [state, formAction, pending] = useActionState(register, initialState);

  return (
    <main className="font-sans flex flex-col gap-4 items-center justify-center h-screen">
      <form action={formAction}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="John Doe"
            name="name"
            defaultValue={state?.fields.name}
          />
          {state?.errors?.name && <p>{state.errors.name[0]}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="m@example.com"
            name="email"
            defaultValue={state?.fields.email}
          />
          {state?.errors?.email && <p>{state.errors.email[0]}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={state?.fields.password}
          />
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul className="list-disc">
                {state.errors.password?.map((error, index) => (
                  <li key={`${error}-${index}`}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button disabled={pending} type="submit">
          Register
        </button>
        {state?.message && <p>{state.message}</p>}
      </form>
    </main>
  );
}
