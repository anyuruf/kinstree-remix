import * as React from 'react';

import { cn } from '@/lib/styles';
import { useField } from 'remix-validated-form';
import { Label } from './label';

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;
	label: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ name, label, className, ...props }, ref) => {
		const { error, getInputProps } = useField(name);
		return (
			<div>
				<Label
					name={name}
					label={label}
					className="text-sm font-medium leading-6"
					htmlFor={name}
				/>
				<div className="mt-2">
					<textarea
						name={name}
						className={cn(
							'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
							className,
						)}
						ref={ref}
						id={name}
						{...props}
						{...getInputProps}
					/>
					{error && (
						<span className="text-destructive text-xs mt-3">{error}</span>
					)}
				</div>
			</div>
		);
	},
);
Textarea.displayName = 'Textarea';

export { Textarea };
