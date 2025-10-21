import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const surveys = await prisma.survey.findMany({
      include: { responses: true },
    });
    return NextResponse.json(surveys, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, surveyType } = body;

    if (!name || !description || !surveyType) {
      return NextResponse.json(
        { error: 'missing required fields' },
        { status: 400 },
      );
    }
    const createdSurvey = await prisma.survey.create({
      data: {
        name,
        description,
        surveyType,
        slug: 'd',
      },
    });

    return NextResponse.json(
      {
        name: createdSurvey.name,
        id: createdSurvey.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
