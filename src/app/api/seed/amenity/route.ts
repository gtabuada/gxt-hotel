import { createId } from "@paralleldrive/cuid2";
import { db } from "~/server/db";
import { type Amenity, amenities } from "~/server/db/schema";

const items = [
  {
    name: "Wi-Fi",
    description: "Este alojamento possui rede Wi-Fi grátis",
    icon: "wifi",
  },
  {
    name: "Estacionamento",
    description: "Vaga de estacionamento disponível para os hóspedes",
    icon: "car-front",
  },
  {
    name: "Ar Condicionado",
    description: "Ambientes climatizados para maior conforto",
    icon: "air-vent",
  },
  {
    name: "Café da Manhã",
    description: "Opção de café da manhã incluso na estadia",
    icon: "coffee",
  },
  {
    name: "Piscina",
    description: "Área de lazer com piscina para os hóspedes",
    icon: "droplets",
  },
  {
    name: "TV a Cabo/Satélite",
    description: "Canais de TV variados para entretenimento",
    icon: "tv",
  },
  {
    name: "Cozinha Equipada",
    description: "Alojamento com cozinha completa para uso dos hóspedes",
    icon: "refrigerator",
  },
  {
    name: "Aceita Pets",
    description:
      "Acomodação pet-friendly, permitindo a presença de animais de estimação",
    icon: "dog",
  },
  {
    name: "Serviço de Limpeza Diário",
    description: "Limpeza diária dos quartos e áreas comuns",
    icon: "sparkles",
  },
  {
    name: "Vista Panorâmica",
    description: "Vista privilegiada para a cidade, mar, montanhas, etc",
    icon: "focus",
  },
  {
    name: "Acessibilidade",
    description:
      "Instalações adaptadas para hóspedes com necessidades especiais",
    icon: "accessibility",
  },
  {
    name: "Academia",
    description: "Espaço fitness com equipamentos para exercícios",
    icon: "dumbbell",
  },
  {
    name: "Recepção 24 Horas",
    description: "Atendimento disponível 24 horas por dia",
    icon: "clock",
  },
  {
    name: "Varanda/Terraço",
    description: "Área ao ar livre para relaxamento ou apreciação da paisagem",
    icon: "sun",
  },
  {
    name: "Escritório Incluso",
    description: "Espaço de trabalho dedicado para viajantes a negócios",
    icon: "briefcase",
  },
].map((item) => ({
  ...item,
  id: createId(),
})) as Amenity[];

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
