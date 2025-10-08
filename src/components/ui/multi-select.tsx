"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type Option = {
  label: string;
  value: string;
};

type MultiSelectProps = {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  label?: string;
};

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options",
  label,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);

  const toggleValue = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="w-full h-full">
      {label && (
        <label className="mb-2 block text-sm font-medium">{label}</label>
      )}
      <div className="relative w-full  z-50">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="w-full">
            <button
              type="button"
              className="w-full border px-4 py-2 flex items-center justify-between rounded-md text-sm"
            >
              <span>
                {selected.length > 0
                  ? (() => {
                      const selectedLabels = options
                        .filter((opt) => selected.includes(opt.value))
                        .map((opt) => opt.label);

                      if (selectedLabels.length > 3) {
                        return `${selectedLabels.slice(0, 3).join(", ")} +${
                          selectedLabels.length - 3
                        }`;
                      }

                      return selectedLabels.join(", ");
                    })()
                  : placeholder}
              </span>
              <ChevronsUpDown className="h-4 w-4 opacity-50" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="min-w-full w-full p-0" side="bottom"   >  {/*  avoidCollisions={false} */}
            <Command className="w-full">
              <CommandList className="w-full">
                <CommandGroup className="w-full h-full overflow-auto" >
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleValue(option.value)}
                      className="w-[290px] z-50 bg-gray-50 flex items-center justify-between"
                    >
                      {option.label}
                      {selected.includes(option.value) && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
              {/* 🔻 Add Reset and Close buttons here */}
              <div className="border-t px-4 py-2 flex justify-between gap-2 bg-gray-50">
                <Button
                  type="button"
                  onClick={() => onChange([])}
                  className="text-sm text-red-500 hover:underline"
                >
                  Reset
                </Button>
                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Close
                </Button>
              </div>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
