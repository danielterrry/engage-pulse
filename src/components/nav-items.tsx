import type { Route } from 'next';

type NavItem<T extends string = string> = {
  href: T;
  label: string;
};

export const navItems: NavItem<Route>[] = [
  { href: '/', label: 'Home' },
  { href: '/profile', label: 'Profile' },
  { href: '/users', label: 'Users' },
];
