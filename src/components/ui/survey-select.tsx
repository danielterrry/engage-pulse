'use client';

import { useState } from 'react';
import { Survey } from '@prisma/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function SurveySelect({ data }: { data: Survey[] | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const param = searchParams.get('response');
  const [survey, setSurvey] = useState<Survey | null>(
    data?.find((s) => s.slug === param),
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (slug) {
      params.set('response', slug);
    } else {
      params.delete('response');
    }

    router.replace(`${pathname}?${params.toString()}`);
    setSurvey(data?.find((s) => s.slug === slug) ?? null);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <h2>{survey ? survey.name : 'nothing selected'}</h2>
        <select name="surveyId" required onChange={handleChange}>
          {data?.map((survey: Survey) => (
            <option value={survey.slug} key={survey.id}>
              {survey.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
