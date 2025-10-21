'use client';

import { Survey } from '@prisma/client';

export default function SurveyDetails({ data }: { data: Survey }) {
  return (
    <div>
      <h1>{data.name}</h1>
      <div>{data.id}</div>
      <div>{data.surveyType}</div>
      <div>{data.description}</div>
    </div>
  );
}
