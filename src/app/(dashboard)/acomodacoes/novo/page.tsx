import { PageContainer } from "~/components/PageContainer";
import { CreateAccommodationForm } from "./_components/create-accommodation-form";

export default function NewAccommodation() {
  return (
    <PageContainer>
      <h2>Adicionar acomodação</h2>
      <CreateAccommodationForm />
    </PageContainer>
  );
}
