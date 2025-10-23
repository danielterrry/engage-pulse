import styles from './page.module.css';
import SurveySelect from '../components/ui/survey-select';
import {
  createSurvey,
  createSurveyResponse,
  getSurveyBySlug,
  getSurveys,
  SurveyInput,
  SurveyResponseInput,
} from '../requests/surveys';
import SurveyResponsesTable from '../components/ui/survey-responses-table';
import { getUsers } from '../requests/users';
// import { redirect } from 'next/navigation'

// const url = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
// export const dynamic = 'force-dynamic';

export async function handleSurveyFormAction(
  formData: FormData,
): Promise<void> {
  'use server';
  const payload: SurveyInput = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    surveyType: formData.get('surveyType') as string,
  };

  await createSurvey(payload);
}

export async function handleSurveyResponseFormAction(
  formData: FormData,
): Promise<void> {
  'use server';
  const payload: SurveyResponseInput = {
    employeeId: formData.get('employeeId') as string,
    surveyId: formData.get('surveyId') as string,
  };

  await createSurveyResponse(payload);
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const allSurveys = await getSurveys();
  const allUsers = await getUsers();
  const slug = ((await searchParams).survey as string) || allSurveys[0].slug;
  const survey = await getSurveyBySlug(slug);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ul>
          <li>submit a survey question</li>
          <li>select a user to submit a specific survey for</li>
          <li>select a user to see their linked surveys</li>
          <li>click the surveyId to see their linked survey questions</li>
          <li>view survey answers</li>
        </ul>

        <form action={handleSurveyFormAction}>
          <input
            name="name"
            defaultValue="Team Collaboration"
            placeholder="name"
            required
          />
          <input
            name="description"
            defaultValue="Ways to enhance cooperation and productivity across departments."
            placeholder="Description"
            required
          />
          <input
            name="surveyType"
            defaultValue="ENGAGE"
            placeholder="Survey Type"
            required
          />
          <button type="submit">create survey</button>
        </form>
        <SurveySelect data={allSurveys} />
        <SurveyResponsesTable data={survey} />
        <form action={handleSurveyResponseFormAction}>
          <select name="employeeId" required>
            {allUsers?.map((user) => (
              <option
                value={user.id}
                key={user.id}
              >{`${user.firstName} ${user.lastName}`}</option>
            ))}
          </select>
          <select name="surveyId" required>
            {allSurveys.map((survey) => (
              <option value={survey.id} key={survey.id}>
                {survey.name}
              </option>
            ))}
          </select>
          <button type="submit">create survey response</button>
        </form>
      </main>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
}
