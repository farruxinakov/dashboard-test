import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name } = body;

    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const exist = await db.bank.findFirst({
      where: {
        name,
      },
    });

    if (exist) {
      return new NextResponse("Conflict", { status: 409 });
    }

    const bank = await db.bank.create({
      data: {
        userId: session.user.id,
        name,
      },
    });

    return NextResponse.json(bank);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
