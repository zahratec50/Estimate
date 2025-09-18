import { cn } from "@/lib/utils"
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-gray-201 dark:bg-secondary-900 animate-pulse rounded-md", className)}
      {...props}
    />
  )
}
export { Skeleton }