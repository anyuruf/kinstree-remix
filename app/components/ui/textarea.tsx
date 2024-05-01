import * as React from "react"

import { cn } from "@/lib/styles"
import { useField } from "remix-validated-form"
import { Label } from "./label"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string
    label: string
  }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ name, label, className, ...props }, ref) => {
    const { error, getInputProps } = useField(name);
    return (
        <>
            <Label name={name} label={label}/>
            <textarea
                className={cn(
                "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                className
                )}
                ref={ref}
                {...props}
                {...getInputProps}
            />
            {error && <span className="text-destructive mt-3">{error}</span>}
      </>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
