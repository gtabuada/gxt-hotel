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
import { useToast } from "~/components/ui/use-toast";
import {
  createAccommodationInput,
  type CreateAccommodationInput,
} from "~/server/db/accommodation/accommodation.validator";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

export function CreateAccommodationForm() {
  const { toast } = useToast();
  const router = useRouter();

  const utils = api.useUtils();

  const { mutate } = api.accommodation.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Acomodação criada com sucesso!",
      });
      void utils.accommodation.invalidate();
      router.push("/acomodacoes");
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
    mutate(values);
  }

  return (
    <Form {...form}>
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

        <Button type="submit" className="my-auto">
          Salvar
        </Button>
      </form>
    </Form>
  );
}
