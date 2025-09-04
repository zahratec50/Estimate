"use client"
import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "peer relative inline-flex h-[1.5rem] w-12 items-center rounded-full transition-colors",
        "bg-gray-300 dark:bg-gray-700", // پس‌زمینه ثابت
        "data-[state=checked]:bg-primary/30", // وقتی فعال شد، یک لایه رنگی
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "block size-5 rounded-full transition-transform",
          "bg-white shadow-md border border-gray-300",
          "data-[state=checked]:translate-x-[calc(100%+4px)] data-[state=unchecked]:translate-x-1",
          "data-[state=checked]:bg-primary" // وقتی فعال شد، رنگش پرایمری
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
