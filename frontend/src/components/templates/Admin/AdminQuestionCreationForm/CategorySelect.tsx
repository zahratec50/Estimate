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

interface CategorySelectProps {
  control: Control<any>;
  isSubmitting: boolean;
}

export default function CategorySelect({
  control,
  isSubmitting,
}: CategorySelectProps) {
  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <CustomSelect
              options={[
                "bathroom",
                "kitchen",
                "living_room",
                "bedroom",
                "other",
              ]}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select category"
              name="Category"
              disabled={isSubmitting}
            />
          </FormControl>
          <FormDescription className="text-xs">
            Select the renovation section this question belongs to. The question
            will be routed accordingly.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
