import Link from 'next/link';

export default function Home() {
  return (
    <main className="font-sans flex flex-col gap-4 items-center justify-center h-screen">
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <Link href="/users">Users</Link>
    </main>
  );
}
