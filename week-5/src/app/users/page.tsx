import { cacheTag } from 'next/cache';
import Link from 'next/link';

import { db } from '@/db';
import { usersTable } from '@/db/schema';

async function getUsers() {
  'use cache';

  cacheTag('users');

  const users = await db.select().from(usersTable);
  return users;
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main className="font-sans flex flex-col gap-4 items-center justify-center h-screen">
      <h1>Users</h1>
      <ul className="list-disc">
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
