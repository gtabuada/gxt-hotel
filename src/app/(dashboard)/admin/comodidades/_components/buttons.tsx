import { ArrowUpDown, PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { Button, type ButtonProps } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export function EditButton({ amenityId }: { amenityId: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Link href={`/admin/comodidades/${amenityId}`}>
              <PencilIcon size={18} />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Editar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function DeleteButton({ amenityId }: { amenityId: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="destructive" size="icon">
            <TrashIcon size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Excluir</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function SortButton({ children }: ButtonProps) {
  return (
    <Button variant="link" className="text-foreground-muted px-0">
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
