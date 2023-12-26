"use client";
import { PlusIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";
import { AmenityForm } from "./form";
import { getQueryKey } from "@trpc/react-query";
import { useIsMutating } from "@tanstack/react-query";
import { useDisclosure } from "~/hooks/useDisclosure";

export function AmenityCreateButton() {
  const mutationKey = getQueryKey(api.amenity.update);
  const isMutating = useIsMutating({ mutationKey });
  const [open, handlers] = useDisclosure();

  return (
    <Dialog
      open={open}
      onOpenChange={(v) =>
        v === false
          ? isMutating > 0
            ? undefined
            : handlers.close()
          : handlers.open()
      }
    >
      <DialogTrigger asChild>
        <Button>
          <PlusIcon size={18} className="mr-2" />
          Adicionar comodidade
        </Button>
      </DialogTrigger>

      <DialogContent
        onPointerDownOutside={
          isMutating > 0 ? (e) => e.preventDefault() : undefined
        }
        className="w-fit max-w-none"
      >
        <DialogHeader>
          <DialogTitle>Adicionar comodidade</DialogTitle>
        </DialogHeader>

        <AmenityForm successCallback={handlers.close} />
      </DialogContent>
    </Dialog>
  );
}
