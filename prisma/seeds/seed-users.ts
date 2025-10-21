import { PrismaClient } from '@prisma/client';
import users from './data/users';

const prisma = new PrismaClient();

async function seedUsers() {
  await prisma.user.createMany({ data: users });
  console.log('seed success!');
}

seedUsers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
