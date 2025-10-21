'use client';

import { useCallback, useState } from 'react';
import { Survey } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SurveySelect({ data }: { data: Survey[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [survey, setSurvey] = useState<Survey | null>(data?.[0] ?? null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(pathname + '?' + createQueryString('survey', e.target.value));

    const id = e.target.value;
    setSurvey(data?.find((u) => u.slug === id) || null);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <h2>{survey ? survey.name : 'nothing selected'}</h2>
        <select value={survey?.slug} onChange={handleChange}>
          {data?.map((survey: Survey) => (
            <option
              value={survey.slug}
              key={survey.id}
            >{`${survey.slug}`}</option>
          ))}
        </select>
      </div>
    </>
  );
}
