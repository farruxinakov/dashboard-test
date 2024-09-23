import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { db } from "@/lib/db";

import Container from "@/components/custom-ui/container";
import SettingsForm from "./_components/settings-form";

export default async function SettingsPage({
  params,
}: {
  params: { dashboardId: string };
}) {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  const bank = await db.bank.findFirst({
    where: {
      userId: session?.user.id,
      id: params.dashboardId,
    },
  });

  if (!bank) redirect("/");

  return (
    <section className="py-12">
      <Container>
        <SettingsForm initialData={bank} />
      </Container>
    </section>
  );
}
