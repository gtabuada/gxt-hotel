"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Icon } from "~/components/Icon";
import { IconPicker } from "~/components/IconPicker";
import { Button, buttonVariants } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { cn } from "~/helpers/cn";
import {
  createAmenityInput,
  updateAmenityInput,
  type CreateAmenityInput,
  type UpdateAmenityInput,
} from "~/server/db/amenity/amenity.validator";
import type { Amenity } from "~/server/db/schema";
import { api } from "~/trpc/react";

type Props = {
  amenity?: Partial<Amenity>;
  successCallback?: () => void;
};

export function AmenityForm({ amenity, successCallback }: Props) {
  const isUpdate = !!amenity?.id;

  if (isUpdate)
    return (
      <Update
        amenity={amenity as Partial<Amenity> & { id: string }}
        successCallback={successCallback}
      />
    );

  return <Create successCallback={successCallback} />;
}

function Create({ successCallback }: { successCallback?: () => void }) {
  const utils = api.useUtils();
  const qtyCheckboxId = useId();

  const { mutate, isLoading } = api.amenity.create.useMutation({
    onSuccess: () => {
      toast("Comodidade criada com sucesso!");
      void utils.accommodation.invalidate();
      successCallback?.();
    },
  });

  const form = useForm<CreateAmenityInput>({
    resolver: zodResolver(createAmenityInput),
    defaultValues: {
      name: "",
      description: "",
    },
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
                Opcional. Exemplo: 2 banheiros. (quantidade = 2)
              </FormDescription>
              {field.value === 0 && (
                <Input
                  {...field}
                  onChange={(e) => form.setValue("quantity", +e.target.value)}
                />
              )}
              <div className="flex items-center gap-2 pt-2">
                <Checkbox
                  id={qtyCheckboxId}
                  checked={field.value === 0}
                  onCheckedChange={(v) =>
                    form.setValue("quantity", v === true ? 0 : -1)
                  }
                />
                <Label htmlFor={qtyCheckboxId}>Usar quantidade</Label>
              </div>

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
              <div className="flex items-baseline gap-2">
                {field.value && (
                  <div className="flex gap-2">
                    <p className="text-foreground-muted text-sm">
                      Ícone selecionado:
                    </p>
                    <Icon name={field.value} />
                  </div>
                )}

                <IconPicker
                  trigger={
                    <div
                      className={cn(
                        buttonVariants({
                          variant: "link",
                        }),
                        "p-0",
                      )}
                    >
                      Selecionar ícone
                    </div>
                  }
                  onSelect={(icon) => form.setValue("icon", icon)}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2 flex w-full items-center justify-end gap-4">
          <Button
            onClick={successCallback}
            disabled={isLoading}
            variant="secondary"
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}

function Update({
  amenity,
  successCallback,
}: {
  amenity: Partial<Amenity> & { id: string };
  successCallback?: () => void;
}) {
  const qtyCheckboxId = useId();
  const utils = api.useUtils();

  const { mutate, isLoading } = api.amenity.update.useMutation({
    onSuccess: () => {
      toast("Comodidade atualizada com sucesso!");
      void utils.accommodation.invalidate();
      successCallback?.();
    },
  });

  const form = useForm<UpdateAmenityInput>({
    resolver: zodResolver(updateAmenityInput),
    defaultValues: amenity,
  });

  function onSubmit(values: UpdateAmenityInput) {
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
              {field.value === 0 && (
                <Input
                  {...field}
                  onChange={(e) => form.setValue("quantity", +e.target.value)}
                />
              )}
              <div className="flex items-center gap-2 pt-2">
                <Checkbox
                  id={qtyCheckboxId}
                  checked={field.value === 0}
                  onCheckedChange={(v) =>
                    form.setValue("quantity", v === true ? 0 : -1)
                  }
                />
                <Label htmlFor={qtyCheckboxId}>Usar quantidade</Label>
              </div>
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
              <div className="flex items-baseline justify-start gap-2">
                {field.value && (
                  <div className="flex gap-2">
                    <p className="text-foreground-muted text-sm">
                      Ícone selecionado:
                    </p>
                    <Icon name={field.value} />
                  </div>
                )}

                <IconPicker
                  trigger={
                    <div
                      className={cn(
                        buttonVariants({
                          variant: "link",
                        }),
                        "p-0",
                      )}
                    >
                      Selecionar ícone
                    </div>
                  }
                  onSelect={(icon) => form.setValue("icon", icon)}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2 flex w-full items-center justify-end gap-4">
          <Button onClick={successCallback} variant="secondary">
            Cancelar
          </Button>
          <Button type="submit" disabled={isLoading}>
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  );
}
