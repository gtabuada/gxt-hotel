import { PageContainer } from "~/components/PageContainer";
import CreateAmenityForm from "../_components/create-amenity-form";

export default function AmenityCreate() {
  return (
    <PageContainer>
      <h2>Cadastrar comodidade</h2>
      <CreateAmenityForm />
    </PageContainer>
  );
}
