import * as LabelPrimitive from '@radix-ui/react-label';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/styles';

const labelVariants = cva(
	'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

interface labelProps
	extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
		VariantProps<typeof labelVariants> {
	name: string;
	label: string;
}

const Label = React.forwardRef<
	React.ElementRef<typeof LabelPrimitive.Root>,
	labelProps
>(({ name, label, className, ...props }, ref) => (
	<LabelPrimitive.Root
		ref={ref}
		htmlFor={name}
		className={cn(labelVariants(), className)}
		{...props}
	>
		{label}
	</LabelPrimitive.Root>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
