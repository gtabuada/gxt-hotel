"use client";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { useMemo, useState } from "react";
import { Icon, type IconName } from "./Icon";
import { useDisclosure } from "~/hooks/useDisclosure";

type Props = {
  trigger: React.ReactNode;
  onSelect: (icon: IconName) => void;
};

export function IconPicker({ trigger, onSelect }: Props) {
  const [search, setSearch] = useState("");
  const [open, handlers] = useDisclosure();
  const iconNames = useMemo(
    () => Object.keys(dynamicIconImports) as IconName[],
    [],
  );

  function select(icon: IconName) {
    onSelect(icon);
    handlers.close();
  }

  return (
    <Popover
      open={open}
      onOpenChange={(v) => (v === false ? handlers.close() : handlers.open())}
    >
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className="w-[300px] space-y-6">
        <Input
          placeholder="Buscar ícone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex h-[200px] w-full flex-wrap gap-2 overflow-y-scroll">
          {iconNames
            .filter((icon) => icon.includes(search))
            .map((icon) => (
              <Button
                size="icon"
                variant="outline"
                className="h-10 w-10"
                onClick={() => select(icon)}
                key={icon}
              >
                <Icon name={icon} />
              </Button>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
