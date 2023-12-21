import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getRoleString } from "~/constants/user-roles";
import { api } from "~/trpc/server";

export default async function Usuarios() {
  const users = await api.user.getUsers.query();

  return (
    <div>
      <h2 className="mb-10">Usuários</h2>

      {users && (
        <Table>
          <TableCaption>{users.length} clientes encontrados.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Função</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role && getRoleString(user.role)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
