import Link from "next/link";
import { PageContainer } from "~/components/PageContainer";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import { api } from "~/trpc/server";
import {
  Table,
  TableBody,
  TableRow,
  TableCaption,
  TableCell,
  TableHeader,
  TableHead,
} from "~/components/ui/table";

export default async function Accommodations() {
  const accommodations = await api.accommodation.getAll.query();

  return (
    <PageContainer>
      <h2>Acomodações</h2>
      <div className="flex w-full  items-end justify-between">
        <p className="muted">
          {accommodations.length} acomodações encontradas.
        </p>
        <div>
          <Button>
            <PlusIcon size={18} className="mr-2" />
            <Link href="/acomodacoes/novo">Adicionar acomodação</Link>
          </Button>
        </div>
      </div>

      {accommodations && (
        <Table>
          <TableCaption>
            {accommodations.length} acomodações encontradas.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Preço</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accommodations.map((acc) => (
              <TableRow key={acc.id}>
                <TableCell className="font-medium">{acc.title}</TableCell>
                <TableCell>{acc.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </PageContainer>
  );
}
