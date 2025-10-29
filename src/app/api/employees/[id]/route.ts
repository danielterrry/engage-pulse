import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    const employees = await prisma.employee.findUnique({
      where: { userId: id },
    });

    if (!employees) {
      return NextResponse.json(
        { error: 'Failed to get employee' },
        { status: 404 },
      );
    }

    return NextResponse.json(employees);
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
