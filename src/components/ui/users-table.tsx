'use client';

import Link from 'next/link';
import { User } from '@prisma/client';
import SearchBar from './search-bar';

export default function UsersTable({ data }: { data: User[] }) {
  console.log('data', data);

  return (
    <div>
      <h1>Survey Responses</h1>
      {Array.isArray(data) && data.length > 0 ? (
        <>
          <SearchBar />
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              border: '1px solid #000',
            }}
          >
            <thead>
              <tr>
                <th>id</th>
                <th>email</th>
                <th>name</th>
                <th>role</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user: User) => (
                <tr key={user.id}>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    <Link href={`/users/${user.id}`}>{user.id}</Link>
                  </td>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    {user.email}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    {user.firstName} {user.lastName}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>no data</p>
      )}
    </div>
  );
}
