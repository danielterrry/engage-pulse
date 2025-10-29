import 'server-only';
import { Survey } from '@prisma/client';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
export interface SurveyInput {
  name: string;
  description: string;
  surveyType: string;
}

export interface SurveyResponseInput {
  employeeId: string;
  surveyId: string;
}

export async function get<T>(endpoint: string): Promise<T | null> {
  const response = await fetch(endpoint, {
    cache: 'no-store',
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`ERROR ${response.status}`);
  }

  return await response.json();
}

export async function post<T1, T2>(
  endpoint: string,
  payload: T1,
  method: 'POST' | 'PUT' = 'POST',
): Promise<T2> {
  try {
    const response = await fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`ERROR ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('ERROR', error);
    throw error;
  }
}

export async function getSurveys(): Promise<Survey[] | null> {
  return get(`${API_BASE_URL}/api/surveys`);
}

export async function getSurveyBySlug(slug: string): Promise<Survey> {
  return get(`${API_BASE_URL}/api/surveys/${slug}`);
}

export async function createSurvey(
  payload: SurveyInput,
): Promise<{ id: string; name: string }> {
  return post(`${API_BASE_URL}/api/surveys`, payload);
}

export async function createSurveyResponse(
  payload: SurveyResponseInput,
): Promise<{
  id: string;
}> {
  return post(`${API_BASE_URL}/api/survey-responses`, payload);
}
