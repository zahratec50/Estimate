"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface OptionsFieldProps {
  control: Control<any>;
}

export default function OptionsField({ control }: OptionsFieldProps) {
  return (
    <FormField
      control={control}
      name="options"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Options (if applicable)</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter options separated by commas (e.g., Small, Medium, Large)"
              className="h-12 bg-white"
              {...field}
            />
          </FormControl>
          <FormDescription className="text-xs">
            For select, checkbox, radio, or button types. Leave blank for text/number.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}