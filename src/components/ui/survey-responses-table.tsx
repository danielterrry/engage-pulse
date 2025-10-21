'use client';

import Link from 'next/link';
import { Survey, SurveyResponse } from '@prisma/client';

export default function SurveyResponsesTable({ data }: { data: Survey }) {
  console.log(data);

  return (
    <div>
      <h1>Survey Responses</h1>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #000',
        }}
      >
        <thead>
          <tr>
            <th>userId</th>
            {/* <th>createdAt</th> */}
            <th>name</th>
            <th>status</th>
            <th>surveyId</th>
          </tr>
        </thead>
        <tbody>
          {data.responses.map((response: SurveyResponse) => (
            <tr key={response.id}>
              <td style={{ border: '1px solid #000', padding: '8px' }}>
                {response.userId}
              </td>
              {/* <td>{new Date(r.createdAt).toLocaleString()}</td> */}
              <td style={{ border: '1px solid #000', padding: '8px' }}>
                {data.name}
              </td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>
                {response.surveyStatus}
              </td>
              <td style={{ border: '1px solid #000', padding: '8px' }}>
                <Link href={`/surveys/${data.slug}`}>{response.surveyId}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
