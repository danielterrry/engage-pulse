'use client';

import Link from 'next/link';
import { Survey, SurveyResponse } from '@prisma/client';

export default function SurveyResponsesTable({ data }: { data: Survey }) {
  return (
    <div>
      <h1>Survey Responses</h1>
      {data !== null ? (
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            border: '1px solid #000',
          }}
        >
          <thead>
            <tr>
              <th>employeeId</th>
              <th>createdAt</th>
              <th>name</th>
              <th>status</th>
              <th>surveyId</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.responses.map((response: SurveyResponse) => (
                <tr key={response.id}>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    {response.employeeId}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    {new Date(response.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    {data.name}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    {response.surveyStatus}
                  </td>
                  <td style={{ border: '1px solid #000', padding: '8px' }}>
                    <Link href={`/surveys/${data.slug}`}>
                      {response.surveyId}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>No survey responses</p>
      )}
    </div>
  );
}
