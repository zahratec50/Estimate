"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import CustomSelect from "../../../modules/CustomSelect/CustomSelect";

interface SelectionModeSelectProps {
  control: Control<any>;
  isSubmitting: boolean;
}

export default function SelectionModeSelect({
  control,
  isSubmitting,
}: SelectionModeSelectProps) {
  return (
    <FormField
      control={control}
      name="selectionMode"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <CustomSelect
              options={["single", "multiple"]}
              value={field.value || "single"}
              onChange={field.onChange}
              placeholder="Select selection mode"
              name="Selection Mode"
              disabled={isSubmitting}
            />
          </FormControl>
          <FormDescription className="text-xs">
            Choose if the user can select one or multiple options.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
