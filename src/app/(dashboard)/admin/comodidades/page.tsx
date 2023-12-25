import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { PageContainer } from "~/components/PageContainer";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/server";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/table";

export default async function Amenity() {
  const amenities = await api.amenity.getAll.query();

  return (
    <PageContainer>
      <h2>Gerir comodidades</h2>
      <div className="flex w-full  items-end justify-between">
        <div>
          <Button>
            <PlusIcon size={18} className="mr-2" />
            <Link href="/admin/comodidades/novo">Adicionar comodidade</Link>
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={amenities} />
    </PageContainer>
  );
}
