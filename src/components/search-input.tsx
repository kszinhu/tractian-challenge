import { ChangeHandler, useFormContext } from "react-hook-form";

import { z } from "zod";
import debounce from "debounce";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { FilterSchema } from "@/routes/company.$companyId";

import { Input } from "./ui/input";
import { useCallback } from "react";

interface SearchTreeItemInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: keyof z.infer<typeof FilterSchema>;
}

export const SearchTreeItemInput = ({
  name,
  ...props
}: SearchTreeItemInputProps) => {
  const { register } = useFormContext<z.infer<typeof FilterSchema>>() || {};
  const methods = register(name);

  const handleTyping = useCallback(
    (onChange: ChangeHandler) =>
      debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
      }, 275),
    []
  );

  return (
    <label
      htmlFor="search"
      className="flex items-center h-11 w-full rounded-md border-input focus-within:ring-1 focus-within:ring-ring border-b-2"
    >
      <Input
        type="search"
        placeholder="Buscar Ativo ou Local"
        className="w-full active:ring-0 focus:ring-0 focus-visible:ring-0"
        {...props}
        {...methods}
        onChange={handleTyping(methods.onChange)}
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      />
      <MagnifyingGlassIcon className="h-6 w-6 text-gray-500 mr-2" />
    </label>
  );
};
