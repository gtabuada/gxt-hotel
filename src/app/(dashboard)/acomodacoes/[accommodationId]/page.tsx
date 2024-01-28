import { PageContainer } from "~/components/PageContainer";
import { CreateAccommodationForm } from "../novo/_components/create-accommodation-form";
import { api } from "~/trpc/server";
import { Button } from "~/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { AccommodationDeleteDialog } from "./_components/AccommodationDeleteDialog";

export default async function AccommodationView({
  params,
}: {
  params: { accommodationId: string };
}) {
  const { accommodationId } = params;
  const accommodation = await api.accommodation.getById.query(accommodationId);

  return (
    <PageContainer>
      <div className="flex items-baseline gap-6 border-b border-border py-2">
        <p className="text-4xl font-semibold tracking-tight">
          {accommodation?.title}
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon-sm">
            <PencilIcon size={18} />
          </Button>
          <AccommodationDeleteDialog accommodation={accommodation}>
            <Button variant="outline" size="icon-sm">
              <TrashIcon size={18} />
            </Button>
          </AccommodationDeleteDialog>
        </div>
      </div>

      <CreateAccommodationForm accommodation={accommodation} />
    </PageContainer>
  );
}
