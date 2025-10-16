import { SURVEY_RESPONSE } from "../../mock-survey-response";

export async function GET() {
  return new Response(JSON.stringify(SURVEY_RESPONSE), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
