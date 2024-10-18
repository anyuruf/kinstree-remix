import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Label } from './label';
import { FormScope, useField, ValueOfInputType } from '@rvf/remix';
import { useId } from 'react';

type FormSelectInput = {
	name: string;
	label: string;
	placeholder: string;
	defaultValue?: string | undefined;
	fieldError?: string | null;
};
export default function FormSelect({
	name,
	label,
	placeholder,
	fieldError,
	defaultValue,
}: FormSelectInput) {
	const errorId = useId();

	return (
		<div>
			<Label
				name={name}
				label={label}
				htmlFor={name}
				className="text-sm font-medium leading-6"
			/>
			<div className="mt-2">
				<Select
					name={name}
					aria-describedby={errorId}
					aria-invalid={!!fieldError}
					defaultValue={defaultValue}
				>
					<SelectTrigger>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="male">Male</SelectItem>
						<SelectItem value="female">Female</SelectItem>
					</SelectContent>
				</Select>
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
}
