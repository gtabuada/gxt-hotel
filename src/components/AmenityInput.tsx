"use client";
import { useId } from "react";
import { Label } from "./ui/label";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { type Amenity } from "~/server/db/schema";
import { CheckCircle, CircleDashedIcon } from "lucide-react";

type Props = {
  onSelect: (amenity: Amenity) => void;
  selected: Amenity[];
};

export function AmenityInput({ onSelect, selected }: Props) {
  const inputId = useId();
  const { data: amenities } = api.amenity.getAll.useQuery(undefined, {
    cacheTime: 1000 * 60 * 60 * 24, // 1 day
  });

  return (
    <div className="space-y-2">
      <Label htmlFor={inputId}>Comodidades</Label>
      <div className="flex flex-wrap overflow-y-scroll rounded-md border border-border p-6">
        {amenities?.map((am) => (
          <AmenityItem
            key={am.id}
            amenity={am}
            selected={selected.some((amenity) => amenity.id === am.id)}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}

type AmenityItemProps = {
  amenity: Amenity;
  selected?: boolean;
  onSelect: (amenity: Amenity) => void;
};

function AmenityItem({ selected, onSelect, amenity }: AmenityItemProps) {
  return (
    <Button
      variant="ghost"
      className="rounded-full"
      onClick={() => onSelect(amenity)}
    >
      <div className="flex items-center gap-2">
        {!selected ? (
          <CircleDashedIcon size={18} />
        ) : (
          <CheckCircle size={18} className="text-primary" />
        )}
        {amenity.name}
      </div>
    </Button>
  );
}
