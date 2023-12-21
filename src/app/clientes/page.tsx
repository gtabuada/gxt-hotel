import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { api } from "~/trpc/server";

export default async function Clientes() {
  const clients = await api.user.getClients.query();

  return (
    <div>
      <h2 className="mb-10">Clientes</h2>

      {clients && (
        <Table>
          <TableCaption>{clients.length} clientes encontrados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Nome</TableHead>
              <TableHead>E-mail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
