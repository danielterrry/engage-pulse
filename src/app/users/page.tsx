import UsersTable from '../../components/ui/users-table';
import { getUsers } from '../../requests/users';

export default async function Users({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = await searchParams?.query;
  const users = await getUsers(query);

  return <UsersTable data={users} />;
}
