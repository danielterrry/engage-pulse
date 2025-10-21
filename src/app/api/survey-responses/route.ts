import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const surveyResponses = await prisma.surveyResponse.findMany();

    return NextResponse.json(surveyResponses, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'failed to fetch survey responses' },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, surveyId, surveyStatus } = body;

    if (!userId || !surveyId || !surveyStatus) {
      return NextResponse.json(
        { error: 'missing required fields' },
        { status: 400 },
      );
    }
    const createdSurveyResponse = await prisma.surveyResponse.create({
      data: {
        userId,
        surveyId,
        surveyStatus,
        slug: 'a',
      },
    });

    return NextResponse.json(createdSurveyResponse, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
