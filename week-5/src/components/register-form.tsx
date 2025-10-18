import { register } from '@/lib/actions';

export function RegisterForm() {
  return (
    <form action={register}>
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
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
