// "use client";

// import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { Control } from "react-hook-form";
// import CustomSelect from "../../CustomSelect/CustomSelect";

// interface TargetUserSelectProps {
//   control: Control<any>;
//   isSubmitting: boolean;
// }

// export default function TargetUserSelect({ control, isSubmitting }: TargetUserSelectProps) {
//   return (
//     <FormField
//       control={form.control}
//       name="targetUser"
//       render={({ field }) => (
//         <FormItem>
//           <FormControl>
//             <CustomSelect
//               options={["homeowner", "contractor", "architect", "other"]}
//               value={field.value}
//               onChange={field.onChange}
//               placeholder="Select target user"
//               name="Target User"
//               disabled={form.formState.isSubmitting}
//             />
//           </FormControl>
//           <FormDescription className="text-xs">
//             Select who this question is intended for.
//           </FormDescription>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }

"use client";

import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Control } from "react-hook-form";
import CustomSelect from "../../CustomSelect/CustomSelect";

interface TargetUserSelectProps {
  control: Control<any>;
  isSubmitting: boolean;
}

export default function TargetUserSelect({ control, isSubmitting }: TargetUserSelectProps) {
  return (
    <FormField
      control={control}
      name="targetUser"
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <CustomSelect
              options={["homeowner", "contractor", "architect", "other"]}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select target user"
              name="Target User"
              disabled={isSubmitting}
            />
          </FormControl>
          <FormDescription className="text-xs">
            Select who this question is intended for.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}