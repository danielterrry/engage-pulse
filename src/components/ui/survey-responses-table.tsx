'use client';

import Link from 'next/link';
import { Survey, SurveyResponse } from '@prisma/client';

export default function SurveyResponsesTable({ data }: { data: Survey }) {
  console.log(data);

  return (
    <div>
      <h1>Survey Responses</h1>
      <table>
        <thead>
          <tr>
            <th>userId</th>
            <th>createdAt</th>
            <th>status</th>
            <th>surveyId</th>
          </tr>
        </thead>
        <tbody>
          {data.responses.map((response: SurveyResponse) => (
            <tr key={response.id}>
              <td>{response.userId}</td>
              {/* <td>{new Date(r.createdAt).toLocaleString()}</td> */}
              <td>{response.surveyStatus}</td>
              <td>
                <Link href={`/surveys/${data.slug}`}>{response.surveyId}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
