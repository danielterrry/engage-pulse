import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = await params;

  try {
    const survey = await prisma.survey.findUnique({
      where: { slug },
      // return each of the responses
      include: { responses: true },
    });

    if (!survey) {
      return NextResponse.json(
        { error: 'Failed to get Survey' },
        { status: 404 },
      );
    }

    return NextResponse.json(survey);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}
