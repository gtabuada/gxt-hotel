import Link from "next/link";
import { PageContainer } from "~/components/PageContainer";
import { buttonVariants } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import { api } from "~/trpc/server";
import { AccommodationCard } from "~/components/AccommodationCard";

export default async function Accommodations() {
  const accommodations = await api.accommodation.getAll.query();

  return (
    <PageContainer>
      <h2>Acomodações</h2>
      <div className="flex w-full  items-end justify-between">
        <p className="muted">
          {accommodations.length} acomodações encontradas.
        </p>
        <div>
          <Link href="/acomodacoes/novo" className={buttonVariants()}>
            <PlusIcon size={18} className="mr-2" />
            Adicionar acomodação
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-8">
        {accommodations.map((acc) => (
          <Link key={acc.id} href={`/acomodacoes/${acc.id}`}>
            <AccommodationCard accommodation={acc} />
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
