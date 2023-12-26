"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Amenity } from "~/server/db/schema";
import { SortButton } from "./buttons";
import { Icon } from "~/components/Icon";
import { AmenityDeleteButton } from "./amenity-delete-button";
import { AmenityEditButton } from "./amenity-edit-button";
import { useDisclosure } from "~/hooks/useDisclosure";

export const columns: ColumnDef<Amenity>[] = [
  {
    accessorKey: "icon",
    header: "Ícone",
    cell: ({ row }) => {
      const icon = row.original.icon;

      return <Icon name={icon} />;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <SortButton
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
        </SortButton>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <SortButton
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantidade
        </SortButton>
      );
    },
    cell: ({ row }) => {
      const qty = row.original.quantity!;

      return <span>{qty < 0 ? "Não aplica" : qty}</span>;
    },
  },
  {
    header: "Ações",
    cell: ({ row }) => {
      const [open, handlers] = useDisclosure();

      return (
        <div className="flex items-center gap-2">
          <AmenityEditButton
            amenity={row.original}
            open={open}
            setOpen={(v) => {
              if (v === false) {
                handlers.close();
              } else {
                handlers.open();
              }
            }}
          />
          <AmenityDeleteButton amenity={row.original} />
        </div>
      );
    },
  },
];
