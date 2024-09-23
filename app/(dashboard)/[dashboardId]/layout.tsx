import { redirect } from "next/navigation";

import { ReactNode } from "react";

import { auth } from "@/auth";

import { db } from "@/lib/db";

import Header from "@/components/header";
import Main from "@/components/main";
import Footer from "@/components/footer";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { dashboardId: string };
}) {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  const bank = await db.bank.findFirst({
    where: {
      id: params.dashboardId,
      userId: session.user.id,
    },
  });

  if (!bank) redirect("/");

  const banks = await db.bank.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="flex min-h-dvh flex-col">
      <Header banks={banks} />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
