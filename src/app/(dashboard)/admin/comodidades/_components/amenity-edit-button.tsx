"use client";
import { PencilIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import type { Amenity } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { AmenityForm } from "./form";
import { useIsMutating } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { DialogClose } from "@radix-ui/react-dialog";

export function AmenityEditButton({
  amenity,
  open,
  setOpen,
}: {
  amenity: Amenity;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const mutationKey = getQueryKey(api.amenity.update);
  const isMutating = useIsMutating({ mutationKey });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <PencilIcon size={18} />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Editar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent
        onPointerDownOutside={
          isMutating > 0 ? (e) => e.preventDefault() : undefined
        }
        className="w-fit max-w-none"
      >
        <DialogHeader>
          <DialogTitle>Editar comodidade</DialogTitle>
          <DialogClose onClick={() => alert(123)} />
        </DialogHeader>

        <AmenityForm amenity={amenity} successCallback={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
