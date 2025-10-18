import { LoginForm } from '@/components/login-form';
import { RegisterForm } from '@/components/register-form';

export default function Home() {
  return (
    <main className="font-sans flex flex-col gap-4 items-center justify-center h-screen">
      <RegisterForm />
      {/* <LoginForm /> */}
    </main>
  );
}
