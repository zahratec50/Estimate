"use client";

import { useFieldArray, Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Trash2, Plus } from "lucide-react";

interface OptionsManagerProps {
  control: Control<any>;
  isSubmitting: boolean;
}

export default function OptionsManager({ control, isSubmitting }: OptionsManagerProps) {
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "options",
  });

  return (
    <FormItem>
      <FormLabel>Options</FormLabel>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <FormField
              control={control}
              name={`options.${index}`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder={`Option ${index + 1}`}
                      {...field}
                      disabled={isSubmitting}
                      className="h-10 bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => remove(index)}
              disabled={isSubmitting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append("")}
          disabled={isSubmitting}
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Option
        </Button>
      </div>
      <div className="text-xs text-muted-foreground mt-2">
        Add options for select, checkbox, radio, or button types.
      </div>
    </FormItem>
  );
}