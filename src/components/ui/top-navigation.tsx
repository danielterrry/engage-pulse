import Link from 'next/link';
import { navItems } from '../nav-items';

export function TopNavigation() {
  return (
    <nav>
      {navItems.map((item) => (
        <Link key={item.href} href={item.href}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
