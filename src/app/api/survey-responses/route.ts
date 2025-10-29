import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const surveyResponses = await prisma.surveyResponse.findMany();

    return NextResponse.json(surveyResponses, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to get survey responses' },
      { status: 500 },
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { employeeId, surveyId } = body;

    if (!employeeId || !surveyId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: {
        // employee relationship with a user
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!employee || !employee.user) {
      throw new Error(`Employee ${employeeId} not found`);
    }

    const employeeName = `${employee.user.firstName} ${employee.user.lastName}`;
    console.log('Employee name', employeeName);

    const employeeResponses = await prisma.surveyResponse.count({
      where: {
        employeeId: employeeId,
      },
    });

    const slug = `${employeeName} response ${employeeResponses + 1}`;
    const created = await prisma.surveyResponse.create({
      data: {
        employeeId,
        surveyId,
        slug: slugify(slug, { lower: true, strict: true }),
      },
    });

    return NextResponse.json(
      {
        id: created.id,
      },
      { status: 201 },
    );
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
