import styles from './page.module.css';
import SurveySelect from '../components/ui/survey-select';
import {
  createSurvey,
  getSurveyBySlug,
  getSurveys,
  SurveyInput,
} from '../requests/surveys';
import SurveyResponsesTable from '../components/ui/survey-responses-table';
import { Survey } from '@prisma/client';

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

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const allSurveys = await getSurveys();

  const survey = await getSurveyBySlug(params.response as string);

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
      </main>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
}
