"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  type CreateAmenityInput,
  createAmenityInput,
} from "~/server/db/amenity/amenity.validator";
import { api } from "~/trpc/react";

export default function CreateAmenityForm() {
  const { toast } = useToast();
  const router = useRouter();
  const utils = api.useUtils();

  const { mutate } = api.amenity.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Comodidade criada com sucesso!",
      });
      void utils.accommodation.invalidate();
      router.push("/admin/comodidades");
    },
  });

  const form = useForm<CreateAmenityInput>({
    resolver: zodResolver(createAmenityInput),
  });

  function onSubmit(values: CreateAmenityInput) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome ou título</FormLabel>
              <FormDescription>
                Cadastre as comodidades separadamente
              </FormDescription>
              <Input
                placeholder="Exemplo: Wi-Fi, Ar condicionado, etc."
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
              <FormLabel>Descrição</FormLabel>
              <FormDescription>
                Descrição breve sobre a comodidade
              </FormDescription>
              <Input
                placeholder="Exemplo: Este alojamento possui rede Wi-Fi de graça."
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormDescription>
                Usar quando necessário. Exemplo: 2 quartos. (quantidade = 2)
              </FormDescription>
              <Input
                {...field}
                onChange={(e) => form.setValue("quantity", +e.target.value)}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ícone</FormLabel>
              <FormDescription>Será mostrado ao lado do nome</FormDescription>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2 flex w-full items-center justify-end gap-4">
          <Button asChild variant="secondary">
            <Link href="/admin/comodidades">Cancelar</Link>
          </Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Form>
  );
}
