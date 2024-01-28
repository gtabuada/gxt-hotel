"use client";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  createAccommodationInput,
  type UpdateAccommodationInput,
  type CreateAccommodationInput,
  updateAccommodationInput,
} from "~/server/db/accommodation/accommodation.validator";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Amenity, type Accommodation } from "~/server/db/schema";
import { toast } from "sonner";
import { Separator } from "~/components/ui/separator";
import { AmenityInput } from "~/components/AmenityInput";

import { cn } from "~/helpers/cn";

import { ArrowRightIcon, CheckIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  accommodation?: Accommodation;
  viewMode?: boolean;
};

export function CreateAccommodationForm({ accommodation, viewMode }: Props) {
  if (viewMode && accommodation) return <View accommodation={accommodation} />;
  if (!!accommodation) return <Update accommodation={accommodation} />;
  return <Create />;
}

function Create() {
  /* PART 1: Info */
  const utils = api.useUtils();
  const {
    data,
    mutate: createAccommodation,
    isSuccess,
    isLoading: isLoadingCreate,
  } = api.accommodation.create.useMutation({
    onSuccess: () => {
      void utils.accommodation.getAll.invalidate();
    },
  });

  const form = useForm<CreateAccommodationInput>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
    resolver: zodResolver(createAccommodationInput),
  });

  function onSubmit(values: CreateAccommodationInput) {
    createAccommodation(values);
  }

  /* PART 2: Details */
  const { mutate: createAccommodationToAmenity, isLoading: isLoadingDetails } =
    api.accommodationToAmenity.addMany.useMutation();

  const [amenities, setAmenities] = useState<Amenity[]>([]);

  function onSelectAmenity(amenity: Amenity) {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a.id !== amenity.id));
      return;
    }
    setAmenities([...amenities, amenity]);
  }

  async function saveDetails() {
    if (!data?.[0]) return;
    const { accommodationId } = data[0];

    createAccommodationToAmenity({
      accommodationId,
      amenities: amenities.map((a) => a.id),
    });
  }

  return (
    <>
      <Form {...form}>
        <h3>Informações</h3>
        <form
          className="grid grid-cols-2 gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome ou título</FormLabel>
                <Input
                  placeholder="Exemplo: Apartamento com varanda"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição breve</FormLabel>
                <Input
                  placeholder="Exemplo: Desfrute de um bom ambiente com direito a varanda."
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precificação inicial (diária)</FormLabel>
                <Input
                  type="number"
                  placeholder="R$ 199.99"
                  {...field}
                  onChange={(e) => form.setValue("price", +e.target.value)}
                />
                <FormDescription>
                  Preço inicial cobrado pela diária da acomodação. Você pode
                  alterar depois.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="my-auto"
            disabled={isSuccess || isLoadingCreate}
          >
            Continuar
            <ArrowRightIcon size={18} className="ml-2" />
          </Button>
        </form>
      </Form>
      <h3>
        Detalhes{" "}
        <small className="text-muted-foreground">
          (preencher acima primeiro)
        </small>
      </h3>

      <div
        className={cn("grid grid-cols-2 gap-2", {
          ["pointer-events-none select-none opacity-40"]: !isSuccess,
        })}
      >
        <AmenityInput onSelect={onSelectAmenity} selected={amenities} />

        <div className="grid h-full w-full place-content-center rounded-md bg-primary/10">
          <h4>TODO: Fotografias</h4>
        </div>

        <div className="col-span-2 mt-4 flex items-center justify-end gap-2 [&>button]:w-1/4">
          <Button
            variant="outline"
            disabled={isLoadingDetails}
            onClick={() => console.log("aha")}
          >
            <XIcon size={18} className="mr-2" />
            Descartar
          </Button>
          <Button onClick={() => saveDetails()} disabled={isLoadingDetails}>
            <CheckIcon size={18} className="mr-2" />
            Salvar
          </Button>
        </div>
      </div>
    </>
  );
}

function Update({ accommodation }: { accommodation: Accommodation }) {
  useEffect(() => {
    console.count("accommodation");
  }, [accommodation]);

  /* PART 1: Info */
  const utils = api.useUtils();
  const { mutate, isLoading: isLoadingInfo } =
    api.accommodation.updateOne.useMutation({
      onSuccess: () => {
        void utils.accommodation.getAll.fetch();
        void utils.accommodation.getById.fetch(accommodation.id);
      },
    });

  const form = useForm<UpdateAccommodationInput>({
    defaultValues: accommodation,
    resolver: zodResolver(updateAccommodationInput),
  });

  function onSubmit(values: UpdateAccommodationInput) {
    if (form.formState.isDirty) {
      mutate(values);
    }
  }

  /* PART 2: Details */
  const { mutate: createAccommodationToAmenity, isLoading: isLoadingDetails } =
    api.accommodationToAmenity.addMany.useMutation({
      onSuccess: async () => {
        await utils.accommodation.invalidate();
      },
    });
  const { mutate: deleteAccommodationToAmenity, isLoading: isLoadingDelete } =
    api.accommodationToAmenity.deleteMany.useMutation({
      onSuccess: async () => {
        await utils.accommodation.invalidate();
      },
    });

  const isLoading = [isLoadingDetails, isLoadingDelete, isLoadingInfo].includes(
    true,
  );

  const [amenities, setAmenities] = useState<Amenity[]>(
    accommodation.accommodationsToAmenities.map((a) => a.amenity),
  );

  function onSelectAmenity(amenity: Amenity) {
    if (amenities.some((am) => am.id === amenity.id)) {
      setAmenities(amenities.filter((a) => a.id !== amenity.id));
      return;
    }
    setAmenities([...amenities, amenity]);
  }

  async function saveDetails() {
    const amenitiesToAdd = amenities.filter(
      (a) =>
        !accommodation.accommodationsToAmenities
          .map((a) => a.amenity.id)
          .includes(a.id),
    );

    const amenitiesToRemove = accommodation.accommodationsToAmenities.filter(
      (a) => !amenities.map((a) => a.id).includes(a.amenity.id),
    );

    if (amenitiesToAdd.length) {
      createAccommodationToAmenity({
        accommodationId: accommodation.id,
        amenities: amenitiesToAdd.map((amenity) => amenity.id),
      });
    }

    if (amenitiesToRemove.length) {
      deleteAccommodationToAmenity({
        accommodationId: accommodation.id,
        amenities: amenitiesToRemove.map((amenity) => amenity.amenity.id),
      });
    }
  }

  /* PART 3: Notify */
  // TODO

  return (
    <>
      <Form {...form}>
        <form
          className="grid grid-cols-4 gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome ou título</FormLabel>
                <Input
                  placeholder="Exemplo: Apartamento com varanda"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precificação inicial (diária)</FormLabel>
                <Input
                  type="number"
                  placeholder="R$ 199.99"
                  {...field}
                  onChange={(e) => form.setValue("price", +e.target.value)}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-span-2 row-span-2 ">{/* <AmenityInput /> */}</div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Descrição breve</FormLabel>
                <Input
                  placeholder="Exemplo: Desfrute de um bom ambiente com direito a varanda."
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="col-span-4 my-6" />
          <div className="space-x-2">
            <Button variant="secondary">voltar</Button>
            <Button type="submit" className="mt-auto">
              Salvar
            </Button>
          </div>
        </form>
      </Form>
      <h3>Detalhes</h3>

      <div className="grid grid-cols-2 gap-2">
        <AmenityInput onSelect={onSelectAmenity} selected={amenities} />

        <div className="grid h-full w-full place-content-center rounded-md bg-primary/10">
          <h4>TODO: Fotografias</h4>
        </div>

        <div className="col-span-2 mt-4 flex items-center justify-end gap-2 [&>button]:w-1/4">
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={() => console.log("aha")}
          >
            <XIcon size={18} className="mr-2" />
            Descartar
          </Button>
          <Button onClick={() => saveDetails()} disabled={isLoading}>
            <CheckIcon size={18} className="mr-2" />
            Salvar
          </Button>
        </div>
      </div>
    </>
  );
}

function View({ accommodation }: { accommodation: Accommodation }) {
  return (
    <div>
      <h4>{accommodation.title}</h4>
      <p>{accommodation.description}</p>
      <p>{accommodation.price}</p>
      <p>
        {accommodation.accommodationsToAmenities.map((ac) => ac.amenity.name)}
      </p>
    </div>
  );
}
