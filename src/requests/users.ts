import 'server-only';
import { User } from '@prisma/client';

export async function getUsers(): Promise<User[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`,
    {
      cache: 'no-store',
    },
  );

  return response.json();
}
