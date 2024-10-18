import * as React from 'react';

import { cn } from '@/lib/styles';
import { FormScope, useField, ValueOfInputType } from '@rvf/remix';
import { Label } from './label';

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;
	label: string;
	fieldError?: string | null;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ name, label, fieldError, className, ...props }, ref) => {
		const errorId = React.useId();

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
						ref={ref}
						className={cn(
							'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
							className,
						)}
						id={name}
						name={name}
						aria-describedby={errorId}
						aria-invalid={!!fieldError}
					/>
					{fieldError && (
						<span
							id={errorId}
							className="text-destructive text-xs font-medium mt-3"
						>
							{fieldError}
						</span>
					)}
				</div>
			</div>
		);
	},
);
Textarea.displayName = 'Textarea';

export { Textarea };
