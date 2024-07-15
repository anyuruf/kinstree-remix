import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Label } from './label';
import { useField } from 'remix-validated-form';

type FormSelectInput = {
	name: string;
	label: string;
	placeholder: string;
};
export default function FormSelect({
	name,
	label,
	placeholder,
}: FormSelectInput) {
	const { error, getInputProps } = useField(name);

	return (
		<div>
			<Label
				name={name}
				label={label}
				className="text-sm font-medium leading-6"
			/>
			<div className="mt-2">
				<Select name={name} {...getInputProps}>
					<SelectTrigger>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="male">Male</SelectItem>
						<SelectItem value="female">Female</SelectItem>
					</SelectContent>
				</Select>
				{error && (
					<span className="text-destructive text-xs mt-3">{error}</span>
				)}
			</div>
		</div>
	);
}
