import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  _: Request,
  { params }: { params: { slug: string } },
) {
  const { slug } = await params;

  try {
    const survey = await prisma.surveyResponse.findMany({
      where: { slug },
    });

    if (!survey) {
      return NextResponse.json({ error: 'failed' }, { status: 404 });
    }

    return NextResponse.json(survey);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'failed' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
