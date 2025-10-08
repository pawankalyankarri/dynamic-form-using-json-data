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
        "peer inline-flex h-6 w-12 shrink-0 items-center rounded-full transition-colors bg-gray-300 data-[state=checked]:bg-gray-300",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full transition-transform",
          "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-1",
          "data-[state=checked]:bg-black data-[state=unchecked]:bg-white"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
