import type { Accommodation } from "~/server/db/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const placeholderImg =
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function AccommodationCard({
  accommodation,
}: {
  accommodation: Accommodation;
}) {
  return (
    <Card className="w-[270px] max-w-[270px]">
      <CardHeader>
        <img src={placeholderImg} alt="Placeholder" />
      </CardHeader>
      <CardContent>
        <p>{accommodation.title}</p>
      </CardContent>
      <CardFooter>
        {accommodation.accommodationsToAmenities.map((a) => (
          <span>{a.amenity.name}</span>
        ))}
      </CardFooter>
    </Card>
  );
}
