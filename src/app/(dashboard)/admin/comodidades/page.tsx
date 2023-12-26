"use client";
import { PageContainer } from "~/components/PageContainer";
import { api } from "~/trpc/react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/table";
import { AmenityCreateButton } from "./_components/amenity-create-button";

export default function Amenity() {
  const { data: amenities } = api.amenity.getAll.useQuery();

  return (
    <PageContainer>
      <h2>Gerir comodidades</h2>
      <div className="flex w-full  items-end justify-between">
        <div>
          <AmenityCreateButton />
        </div>
      </div>
      {amenities && <DataTable columns={columns} data={amenities.reverse()} />}
    </PageContainer>
  );
}
