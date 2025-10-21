import SurveyDetails from '../../../components/ui/survey-details';
import { getSurveyBySlug } from '../../../requests/surveys';

export default async function SurveyInfoPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const survey = await getSurveyBySlug(slug);

  if (!survey) return <>...</>;

  return <SurveyDetails data={survey} />;
}
