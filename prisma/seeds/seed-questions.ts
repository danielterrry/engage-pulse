import { PrismaClient } from '@prisma/client';
import questions from './data/questions';

const prisma = new PrismaClient();

async function seedQuestions() {
  await prisma.surveyQuestion.createMany({ data: questions });
  console.log('seed success!');
}

seedQuestions()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
