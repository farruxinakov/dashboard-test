import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

import { db } from "@/lib/db";

export async function POST(
  req: NextRequest,
  { params }: { params: { dashboardId: string } },
) {
  try {
    const body = await req.json();
    const {
      group,
      performer,
      partner_name,
      partner_contact,
      request,
      response_to_a_request,
      request_solution_date,
      solving_request_in_days,
      feedback,
      source,
      status,
    } = body;

    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const bankByUserId = await db.bank.findFirst({
      where: {
        userId: session.user.id,
        id: params.dashboardId,
      },
    });

    if (!bankByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const exist = await db.table.findFirst({
      where: {
        group,
        performer,
        partner_name,
        partner_contact,
        request,
        response_to_a_request,
        request_solution_date,
        solving_request_in_days,
        feedback,
        source,
        status,
      },
    });

    if (exist) {
      return new NextResponse("Conflict", { status: 409 });
    }

    const table = await db.table.create({
      data: {
        bankId: params.dashboardId,
        performer,
        group,
        partner_name,
        partner_contact,
        request,
        response_to_a_request,
        request_solution_date,
        solving_request_in_days,
        feedback,
        source,
        status,
      },
    });

    return NextResponse.json(table);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { dashboardId: string } },
) {
  try {
    const tables = await db.table.findMany({
      where: {
        bankId: params.dashboardId,
      },
    });

    return NextResponse.json(tables);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
