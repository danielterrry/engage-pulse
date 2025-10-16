import { Rating } from "./Rating";

export type SurveyResponse = {
  employeeId: number;
  email: string;
  createdAt: string;
  answers: Rating[];
};
