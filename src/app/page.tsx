import styles from "./page.module.css";
import { SurveyResponse } from "./types/SurveyResponse";

async function getSurveyResponses(): Promise<SurveyResponse[]> {
  const res = await fetch("http://localhost:3000/api/survey", {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const data = await getSurveyResponses();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Survey Responses</h1>
          <table>
            <thead>
              <tr>
                <th>Email</th>
                <th>Employee ID</th>
                <th>Created</th>
                <th>Answers</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.employeeId}>
                  <td>{r.email}</td>
                  <td>{r.employeeId}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                  <td>{r.answers.join(" ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
}
