import { register } from '@/lib/actions';

export function RegisterForm() {
  return (
    <form action={register}>
      <input type="email" name="email" required />
      <input type="password" name="password" />
      <button type="submit">Register</button>
    </form>
  );
}
