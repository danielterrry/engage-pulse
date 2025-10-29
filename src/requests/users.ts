import 'server-only';
import { User, Employee } from '@prisma/client';
import { get } from './surveys';

export async function getUsers(query?: string): Promise<User[]> {
  const url = query
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users?query=${query}`
    : `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`;

  return get<User[]>(url);
}

export async function getUserById(id: string): Promise<User> {
  return get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/${id}`);
}

export async function getEmployeesById(id: string): Promise<Employee[]> {
  return get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/employees/${id}`);
}
