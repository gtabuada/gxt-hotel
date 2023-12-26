"use client";

import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useDisclosure } from "~/hooks/useDisclosure";
import { type Amenity } from "~/server/db/schema";
import { api } from "~/trpc/react";

export function AmenityDeleteButton({ amenity }: { amenity: Amenity }) {
  const [open, handlers] = useDisclosure();
  const utils = api.useUtils();

  const { mutate, isLoading } = api.amenity.delete.useMutation({
    onSuccess: () => {
      toast("Comodidade excluída com sucesso");
      void utils.amenity.getAll.invalidate();
      handlers.close();
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => (v === true ? handlers.open() : handlers.close())}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <TrashIcon size={18} />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Excluir</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent
        onPointerDownOutside={isLoading ? (e) => e.preventDefault() : undefined}
      >
        <DialogHeader>
          <DialogTitle>Excluir comodidade: {amenity.name}</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita. Você tem certeza que deseja excluir
            essa comodidade?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary" disabled={isLoading}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            onClick={() => mutate(amenity.id)}
            disabled={isLoading}
          >
            {isLoading ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
