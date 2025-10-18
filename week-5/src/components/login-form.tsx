import { login } from '@/lib/actions';

export function LoginForm() {
  return (
    <form action={login}>
      <input type="email" name="email" required />
      <input type="password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
}
