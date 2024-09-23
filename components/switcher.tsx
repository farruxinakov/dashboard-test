"use client";

import { useParams, useRouter } from "next/navigation";

import { useState } from "react";

import { Bank } from "@prisma/client";

import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";

import useBankModal from "@/store/use-bank-modal";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface SwitcherProps extends PopoverTriggerProps {
  banks: Bank[];
}

const Switcher: React.FC<SwitcherProps> = ({ banks }) => {
  const params = useParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { onOpen } = useBankModal();

  const currentBank = banks.find((bank) => bank.id === params.dashboardId);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" title={currentBank?.name}>
          <StoreIcon className="mr-2 h-4 w-4" />
          {currentBank?.name}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search a bank" />
            <CommandGroup heading={banks.length >= 1 ? "Bank:" : "Banks:"}>
              {banks.map((bank, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => {
                    setIsOpen(false);

                    router.push(`/${bank.id}`);
                  }}
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {bank.name}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      bank.id === currentBank?.id ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandEmpty>No results.</CommandEmpty>
          </CommandList>
          <Separator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setIsOpen(false);

                  onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create a new bank
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Switcher;
