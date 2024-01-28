/* eslint-disable @typescript-eslint/no-empty-function */
import type { Accommodation } from "~/server/db/schema";
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
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";

type Props = {
  accommodation?: Accommodation;
  children: React.ReactNode;
};

export function AccommodationDeleteDialog({ accommodation, children }: Props) {

  const { mutate, isLoading } = api.accommodation.deleteOne.mutate(accommodation!.id, {
    onSuccess: async () => {
      revalidatePath("/acomodacoes");
      toast("Acomodação excluída com sucesso.");
    },
  });

  if (!accommodation) return children;

  return (
    <Dialog onOpenChange={isLoading === true ? () => {} : undefined}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja realmente excluir esta acomodação?</DialogTitle>
          <DialogDescription className="pt-2">
            Esta ação é irreversível.
            <br />
            Acomodação: {accommodation.title}.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center gap-6">
          <DialogClose disabled={isLoading}>Cancelar</DialogClose>
          <Button
            variant="destructive"
            onClick={() => mutate(accommodation.id)}
            disabled={isLoading}
          >
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
