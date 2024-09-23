import { format } from "date-fns";

import { db } from "@/lib/db";

import Container from "@/components/custom-ui/container";
import TablesClient from "./_components/client";
import { TableColumn } from "./_components/columns";

export default async function TablesPage({
  params,
}: {
  params: { dashboardId: string };
}) {
  const tables = await db.table.findMany({
    where: {
      bankId: params.dashboardId,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const formattedTables: TableColumn[] = tables.map((table) => ({
    id: table.id,
    performer: table.performer,
    group: table.group,
    partner_name: table.partner_name,
    partner_contact: table.partner_contact,
    request: table.request,
    response_to_a_request: table.response_to_a_request,
    request_solution_date: table.request_solution_date,
    solving_request_in_days: table.solving_request_in_days,
    feedback: table.feedback,
    source: table.source,
    status: table.status,
    created_at: format(table.created_at, "MMMM do, yyyy"),
  }));

  return (
    <>
      <section className="py-12">
        <Container>
          <TablesClient data={formattedTables} />
        </Container>
      </section>
    </>
  );
}
