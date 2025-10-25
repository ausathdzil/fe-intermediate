import { eq } from 'drizzle-orm';
import { Suspense } from 'react';

import { db } from '@/db';
import { usersTable } from '@/db/schema';

async function getUser(id: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, Number(id)));

  return user;
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Suspense>
  );
}
