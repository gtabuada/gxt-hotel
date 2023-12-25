import { createId } from "@paralleldrive/cuid2";
import { db } from "~/server/db";
import { amenities } from "~/server/db/schema";

const items = [
  { name: "Wi-Fi", description: "Este alojamento possui rede Wi-Fi grátis" },
  {
    name: "Estacionamento",
    description: "Vaga de estacionamento disponível para os hóspedes",
  },
  {
    name: "Ar Condicionado",
    description: "Ambientes climatizados para maior conforto",
  },
  {
    name: "Café da Manhã",
    description: "Opção de café da manhã incluso na estadia",
  },
  {
    name: "Piscina",
    description: "Área de lazer com piscina para os hóspedes",
  },
  {
    name: "TV a Cabo/Satélite",
    description: "Canais de TV variados para entretenimento",
  },
  {
    name: "Cozinha Equipada",
    description: "Alojamento com cozinha completa para uso dos hóspedes",
  },
  {
    name: "Aceita Pets",
    description:
      "Acomodação pet-friendly, permitindo a presença de animais de estimação",
  },
  {
    name: "Serviço de Limpeza Diário",
    description: "Limpeza diária dos quartos e áreas comuns",
  },
  {
    name: "Vista Panorâmica",
    description: "Vista privilegiada para a cidade, mar, montanhas, etc",
  },
  {
    name: "Acessibilidade",
    description:
      "Instalações adaptadas para hóspedes com necessidades especiais",
  },
  {
    name: "Academia",
    description: "Espaço fitness com equipamentos para exercícios",
  },
  {
    name: "Recepção 24 Horas",
    description: "Atendimento disponível 24 horas por dia",
  },
  {
    name: "Varanda/Terraço",
    description: "Área ao ar livre para relaxamento ou apreciação da paisagem",
  },
  {
    name: "Escritório Incluso",
    description: "Espaço de trabalho dedicado para viajantes a negócios",
  },
].map((item) => ({
  ...item,
  id: createId(),
}));

const handler = async () => {
  try {
    const result = await db.insert(amenities).values(items);

    return Response.json({
      success: true,
      inserted: result.rowCount,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
    });
  }
};

export { handler as POST };
