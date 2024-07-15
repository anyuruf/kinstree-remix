import * as React from 'react';
import { useField } from 'remix-validated-form';
import { cn } from '@/lib/styles';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ name, className, type, ...props }, ref) => {
		const { error, getInputProps } = useField(name);
		return (
			<div>
				<input
					type={type}
					className={cn(
						'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
						className,
					)}
					ref={ref}
					name={name}
					{...props}
					{...getInputProps}
				/>
				{error && (
					<span className="text-destructive text-xs font-medium mt-3">
						{error}
					</span>
				)}
			</div>
		);
	},
);
Input.displayName = 'Input';

export { Input };
