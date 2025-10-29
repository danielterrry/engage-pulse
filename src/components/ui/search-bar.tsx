'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const params = new URLSearchParams(searchParams);
      const term = e.target.value;
      if (term) {
        params.set('query', term);
      } else {
        params.delete('query');
        params.delete('search');
      }
      replace(`${pathname}?${params.toString()}`);
    },
    300,
  );

  const handleClick = (userId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('search', userId);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <input
        placeholder="search..."
        onChange={handleSearch}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
}
