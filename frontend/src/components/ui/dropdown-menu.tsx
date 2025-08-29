"use client";

import * as React from "react";
import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils"; // اگر داری تابع cn برای classNames

export const DropdownMenu = RadixDropdownMenu.Root;
export const DropdownMenuTrigger = RadixDropdownMenu.Trigger;
export const DropdownMenuContent = ({
  className,
  ...props
}: React.ComponentProps<typeof RadixDropdownMenu.Content>) => (
  <RadixDropdownMenu.Content
    align="end"
    sideOffset={5}
    className={cn(
      "min-w-[150px] bg-white dark:bg-secondary-800 rounded-md shadow-md p-1",
      className
    )}
    {...props}
  />
);
export const DropdownMenuItem = ({
  className,
  ...props
}: React.ComponentProps<typeof RadixDropdownMenu.Item>) => (
  <RadixDropdownMenu.Item
    className={cn(
      "px-3 py-2 text-sm cursor-pointer rounded-md hover:bg-gray-100 dark:hover:bg-secondary-700",
      className
    )}
    {...props}
  />
);
