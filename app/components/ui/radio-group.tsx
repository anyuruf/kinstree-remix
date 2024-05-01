import * as React from "react"
import { CheckIcon } from "@radix-ui/react-icons"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/styles"
import { useField } from "remix-validated-form"
import { Label } from "./label"


interface RadioGroupInput extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
{
    name: string
    label: string
}
const RadioGroup = React.forwardRef<
React.ElementRef<typeof RadioGroupPrimitive.Root>,
RadioGroupInput
>(({ name, label, className, ...props }, ref) => {
    const { getInputProps }= useField(name)
  return (
    <>
    <Label name={name} label={label}/>
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      {...getInputProps({id: name})}
      ref={ref}
    />
    </>
  )
})

interface RadioGroupItemInput {
    name: string
    label: string
    className?: string
}

const RadioGroupItem = (({ name, label, className, ...props }: RadioGroupItemInput, ref: React.Ref<HTMLButtonElement> | undefined) => {
   
  return (
    <div className="flex items-center space-x-2">
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(
              "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className
          )}
          id={name}
          {...props}
          value={name}      
      >
          <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
              <CheckIcon className="h-3.5 w-3.5 fill-primary" />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        <Label name={name} label={label} />
    </div>
  )
})

export { RadioGroup, RadioGroupItem }
