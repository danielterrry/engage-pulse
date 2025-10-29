import { getUserById } from '../../../requests/users';
import { Employee, Survey } from '@prisma/client';
import {
  createSurveyResponse,
  getSurveys,
  SurveyResponseInput,
} from '../../../requests/surveys';

export async function handleSurveyResponseFormAction(
  employeeId: string,
  formData: FormData,
): Promise<void> {
  'use server';
  const payload: SurveyResponseInput = {
    employeeId,
    surveyId: formData.get('surveyId') as string,
  };

  await createSurveyResponse(payload);
}

export default async function User({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await getUserById(id);
  const allSurveys = await getSurveys();
  const updateEmployeeWithId = handleSurveyResponseFormAction.bind(
    null,
    user?.employees[0]?.id,
  );

  return (
    <>
      <h2>User</h2>
      <div style={{ border: '1px solid #000', padding: '8px' }}>{user.id}</div>
      <div style={{ border: '1px solid #000', padding: '8px' }}>
        {user.email}
      </div>
      <div style={{ border: '1px solid #000', padding: '8px' }}>
        {user.firstName} {user.lastName}
      </div>
      <div style={{ border: '1px solid #000', padding: '8px' }}>
        {user.role}
      </div>

      {user?.employees.length > 0 ? (
        <>
          <h2>Employees</h2>
          {user.employees.map((employee: Employee) => (
            <div key={employee.id}>
              <div>{employee.id}</div>
              <div>{new Date(employee.createdAt).toLocaleDateString()}</div>
            </div>
          ))}
          <br />
          <form action={updateEmployeeWithId}>
            <select name="surveyId" required>
              {allSurveys?.map((survey: Survey) => (
                <option value={survey.id} key={survey.id}>
                  {survey.name}
                </option>
              ))}
            </select>
            <button type="submit">create survey response</button>
          </form>
        </>
      ) : (
        <p>No employees found</p>
      )}
    </>
  );
}
