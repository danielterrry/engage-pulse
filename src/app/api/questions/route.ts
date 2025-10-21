import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const questions = await prisma.surveyQuestion.findMany();
    return NextResponse.json(questions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
