import { unstable_cache } from 'next/cache';

import { db } from '@/db';
import { usersTable } from '@/db/schema';

const getUser = unstable_cache(async () => {
  const users = await db.select().from(usersTable);
  return users;
}, ['users']);

export default async function UsersPage() {
  const users = await getUser();

  return (
    <main className="font-sans flex flex-col gap-4 items-center justify-center h-screen">
      <h1>Users</h1>
      <ul className="list-disc">
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </main>
  );
}
