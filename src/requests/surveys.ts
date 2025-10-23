import 'server-only';
import { Survey } from '@prisma/client';

export interface SurveyInput {
  name: string;
  description: string;
  surveyType: string;
}

export interface SurveyResponseInput {
  employeeId: string;
  surveyId: string;
}

export async function getSurveys(): Promise<Survey[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surveys`,
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    console.error('failed');
  }

  return response.json();
}

export async function getSurveyBySlug(slug: string): Promise<Survey> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surveys/${slug}`,
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    console.error('failed');
  }

  return response.json();
}

export async function createSurvey(
  payload: SurveyInput,
): Promise<{ name: string; id: string } | { status: number; error: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surveys`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      return { status: response.status, error: data.error || 'unknown' };
    }

    // { name: string, id: string }
    return data;
  } catch (error: any) {
    return { status: 500, error: error?.message || 'unknown' };
  }
}

export async function createSurveyResponse(
  payload: SurveyResponseInput,
  // todo
): Promise<any> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/survey-responses`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();
    if (!response.ok) {
      return { status: response.status, error: data.error || 'unknown' };
    }

    return data;
  } catch (error: any) {
    return { status: 500, error: error?.message || 'unknown' };
  }
}
