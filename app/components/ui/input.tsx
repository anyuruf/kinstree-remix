import * as React from 'react';
import { FormScope, useField, ValueOfInputType } from '@rvf/remix';
import { cn } from '@/lib/styles';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	fieldError?: string | null;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ name, className, fieldError, type, ...props }, ref) => {
		//const field = useField(scope);
		const errorId = React.useId();

		return (
			<>
				<input
					type={type}
					id={name}
					name={name}
					aria-describedby={errorId}
					aria-invalid={!!fieldError}
					className={cn(
						'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
						className,
					)}
					ref={ref}
					{...props}
				/>
				{fieldError && (
					<span
						id={errorId}
						className="text-destructive text-xs font-medium mt-3"
					>
						{fieldError}
					</span>
				)}
			</>
		);
	},
);
Input.displayName = 'Input';

export { Input };
