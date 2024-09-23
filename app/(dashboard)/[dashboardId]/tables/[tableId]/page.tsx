import Container from "@/components/custom-ui/container";
import TableForm from "./_components/table-form";
import { db } from "@/lib/db";

export default async function TablePage({
  params,
}: {
  params: { tableId: string };
}) {
  const table = await db.table.findUnique({
    where: {
      id: params.tableId,
    },
  });

  return (
    <section className="py-12">
      <Container>
        <TableForm initialData={table} />
      </Container>
    </section>
  );
}
